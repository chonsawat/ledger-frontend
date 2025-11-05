import { Form, redirect, useLoaderData, useLocation, useNavigate } from "react-router"
import { ChangeEvent, useEffect, useState } from "react"
import { fetchLedgerById, updateLedger } from "../../services/apiLedger"
import { fetchAccounts } from "../../services/apiAccounts"
import { AccountType } from "../Account/Account"
import { LedgerType, LedgerUpdateType, newLedgerDetailAccountSelected, newLedgerDetailAccountSelectedType } from "../../store/ledger"
import { useAtom } from "jotai"

// TODO: Update this to api
function LedgerUpdate() {
    const [theLedger, setTheLedger] = useState<LedgerUpdateType>()
    const { ledger, accounts } = useLoaderData<{ ledger: LedgerType, accounts: AccountType }>()

    useEffect(() => {
        setTheLedger(ledger)
    }, [])

    function onChangeLedger(e: ChangeEvent<HTMLInputElement>, fieldName: string) {

        let value = e.target.value
        if (value.split(' ')[0] === '฿') {
            value = value.split(' ')[1]
        }

        setTheLedger((prev) => (
            { ...prev, id: prev?.id, [fieldName]: value }
        ))
    }

    return (
        <div className="my-5">
            <Form action="" method="POST" className="border rounded-xl ml-2 mr-4">
                <DataRow name="Date" inputName="date" value={theLedger?.date} ></DataRow>
                <DataRow name="Description" inputName="description" value={theLedger?.description} onChangeFn={(e: ChangeEvent<HTMLInputElement>) => onChangeLedger(e, "description")}></DataRow>
                <AccountDropDown mode="credit"></AccountDropDown>
                <DataRow name="Credit Amount" inputName="credit_amount" value={theLedger?.credit_amount} onChangeFn={(e: ChangeEvent<HTMLInputElement>) => onChangeLedger(e, "credit_amount")}></DataRow>
                <AccountDropDown mode="debit"></AccountDropDown>
                <DataRow name="Debit Amount" inputName="debit_amount" value={theLedger?.debit_amount} onChangeFn={(e: ChangeEvent<HTMLInputElement>) => onChangeLedger(e, "debit_amount")}></DataRow>
                <ButtonSubmit></ButtonSubmit>
                <div className="hidden">
                    <input type="hidden" name="accounts" value={JSON.stringify(accounts)} />
                </div>
            </Form>
        </div>
    )
}

type DataRowType = { name: string, value: string | number | undefined, onChangeFn?: (e: ChangeEvent<HTMLInputElement>) => void, inputName: string }
function DataRow({ name, value, onChangeFn, inputName }: DataRowType) {
    return (
        <div className="flex my-2 mx-2">
            <p className="mr-2">{name}: </p>
            <input name={inputName} type="text" placeholder={name} className="rounded-sm border" defaultValue={value} onChange={onChangeFn} />
            <br />
        </div>
    )
}

function AccountDropDown({ mode }: { mode: string }) {
    const { accounts } = useLoaderData<{ accounts: AccountType[] }>()
    const name = mode === "credit" ? "credit_account" : "debit_account"
    const description = mode === "credit" ? "Credit Account" : "Debit Account"
    const [newLedgerDetailAccounts, setDetailAccounts] = useAtom<newLedgerDetailAccountSelectedType>(newLedgerDetailAccountSelected)

    function handleAccountChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setDetailAccounts({ ...newLedgerDetailAccounts, [name]: Number(e.target.value) })
    }

    return (
        <div className={`flex my-2 mx-2`}>
            <label htmlFor={name} className='mr-2'>{description}: </label>
            <select name={name} id={name} defaultValue={newLedgerDetailAccounts[name]} onChange={handleAccountChange} className="border rounded-sm">
                <option value={0}>Select an accounts</option>
                {accounts.map((account: AccountType) => (
                    <option key={account.id} value={account.id}>
                        {account.id} : {account.desc}
                    </option>
                ))}
            </select>
        </div>
    )
}

function ButtonSubmit() {
    const navigate = useNavigate()

    return (
        <div className="mb-3 mx-3">
            <button className="hover:cursor-pointer hover:bg-orange-400 rounded-xl bg-orange-500 text-white px-5 py-1" type="submit">Update</button>
            <a className="hover:cursor-pointer hover:bg-red-700 rounded-xl bg-red-500 text-white px-5 py-1.25 ml-2" onClick={() => navigate(-1)}>Back</a>
        </div>
    )
}

export async function loader({ params: { theId } }: { params: { theId: number } }) {
    const ledgerFetched = await fetchLedgerById(theId);
    const accountFetched = await fetchAccounts();
    return {
        ledger: ledgerFetched,
        accounts: accountFetched
    }
}

export async function action({ params, request }: { params: any, request: any }) {

    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; // Format: "YYYY-MM-DD"

    const formData = await request.formData();
    const data = Object.fromEntries(formData)
    const selectedCreditData = JSON.parse(data.accounts).filter((x: AccountType) => x.id == data.credit_account)
    const selectedDebitData = JSON.parse(data.accounts).filter((x: AccountType) => x.id == data.debit_account)
    const ledger = {
        id: params.theId,
        date: data.date,
        description: data.description,
        credit_account: selectedCreditData[0] ? { ...selectedCreditData[0], updateDate: formattedDate } : null,
        debit_account: selectedDebitData[0] ? { ...selectedDebitData[0], updateDate: formattedDate } : null,
        credit_amount: data.credit_amount,
        debit_amount: data.debit_amount,
    }
    console.group("Update Ledger")
    const updatedLedger = await updateLedger(ledger);
    console.groupEnd()
    return window.history.back();
}

export default LedgerUpdate