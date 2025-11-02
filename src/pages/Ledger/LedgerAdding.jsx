import { useEffect, useState } from "react"
import { redirect, useLoaderData, useNavigate } from "react-router"
import { Form } from "react-router-dom"
import { addLedger } from "../../services/apiLedger"

function LedgerAdding({previousPage}) {
    const navigate = useNavigate()
    const [selectedCreditAccount, setSelectedCreditAccount] = useState(2)
    const [selectedDebitAccount, setSelectedDebitAccount] = useState(0)
    const [selectedDate, setSelectedDate] = useState("")
    const accounts = useLoaderData()

    function handleAccountChangeCredit(e) {
        setSelectedCreditAccount(e.target.value)
    }

    function handleAccountChangeDebit(e) {
        setSelectedDebitAccount(e.target.value)
    }

    useEffect(() => {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; // Format: "YYYY-MM-DD"
        setSelectedDate(formattedDate)
    }, [])

    return (
        <div className="my-5">
            <Form method="POST" className="border rounded-xl ml-2 mr-4">
                <div className="flex my-2 mx-2 mt-5">
                    <p className="mr-2">Date: </p>
                    <input name="date" type="text" placeholder="Date" className="border rounded-sm" defaultValue={selectedDate}/>
                    <br />
                </div>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Description: </p>
                    <input name="description" type="text" placeholder="Description" className="border rounded-sm" />
                    <br />
                </div>
                <CreditAccountDropDown data={accounts} selected={selectedCreditAccount} onChangeFn={handleAccountChangeCredit}></CreditAccountDropDown>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Credit Amount: </p>
                    <input name="credit_amount" type="number" placeholder="Credit Amount" className="border rounded-sm" />
                    <br />
                </div>
                <DebitAccountDropDown data={accounts} selected={selectedDebitAccount} onChangeFn={handleAccountChangeDebit}></DebitAccountDropDown>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Debit Amount: </p>
                    <input name="debit_amount" type="number" placeholder="Debit Amount" className="border rounded-sm" />
                    <br />
                </div>
                {/* <div className="flex my-2 mx-2">
                    <p className="mr-2">Total Credit Balance: </p>
                    <input type="text" placeholder="Total Credit Balance" className="rounded-sm" disabled/>
                    <br />
                </div>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Total Debit Balance: </p>
                    <input type="text" placeholder="Total Debit Balance" className="rounded-sm" disabled/>
                    <br />
                </div>   */}
                <div className="mb-3 mx-3">
                    <button className="hover:cursor-pointer hover:bg-lime-700 rounded-xl bg-lime-500 text-white px-5 py-1" type="submit">Add</button>
                    <a className="hover:cursor-pointer hover:bg-red-700 rounded-xl bg-red-500 text-white px-5 py-1.25 ml-2" onClick={() => {navigate(-1)}}>Back</a>
                </div>

                <div className="hidden">
                    <input type="hidden" name="accounts" value={JSON.stringify(accounts)} />
                </div>
            </Form>
        </div>
    )
}

function CreditAccountDropDown({data, selected, onChangeFn}) {
    return (
        <div className="flex my-2 mx-2">
            <label htmlFor="credit_account" className='mr-2'>Credit Account: </label>
            <select name="credit_account" id="credit_account" value={selected} onChange={onChangeFn} className="border rounded-sm">
                <option value={0}>Select an accounts</option>
                {data.map((account) => (
                <option key={account.id} value={account.id}>
                    {account.id} : {account.desc}
                </option>
                ))}
            </select>
        </div>
    )
}

function DebitAccountDropDown({data, selected, onChangeFn}) {
    return (
        <div className="flex my-2 mx-2">
            <label htmlFor="debit_account" className='mr-2'>Debit Account: </label>
            <select name="debit_account" id="debit_account" value={selected} onChange={onChangeFn} className="border rounded-sm">
                <option value={0}>Select an accounts</option>
                {data.map((account) => (
                <option key={account.id} value={account.id}>
                    {account.id} : {account.desc}
                </option>
                ))}
            </select>
        </div>
    )
}

export async function action({params, request}) {    

    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; // Format: "YYYY-MM-DD"

    const formData = await request.formData();
    const data = Object.fromEntries(formData) 
    const selectedCreditData = JSON.parse(data.accounts).filter((x) => x.id == credit_account.value)
    const selectedDebitData = JSON.parse(data.accounts).filter((x) => x.id == debit_account.value)
    const ledger = {
        date: data.date,
        description: data.description,
        credit_account: selectedCreditData[0] ? { ...selectedCreditData[0], updateDate: formattedDate } : null,
        debit_account: selectedDebitData[0] ? { ...selectedDebitData[0], updateDate: formattedDate } : null,
        credit_amount: data.credit_amount,
        debit_amount: data.debit_amount,
    }

    console.group("Create Ledger")
    const newLedger = await addLedger(ledger);
    // console.log(params);
    // console.log(request);
    console.groupEnd("Create Ledger")
    return window.history.back()
}

export default LedgerAdding