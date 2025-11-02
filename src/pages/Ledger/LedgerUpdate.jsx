import { Form, redirect, useLoaderData, useLocation, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { fetchLedgerById, updateLedger } from "../../services/apiLedger"
import { fetchAccounts } from "../../services/apiAccounts"

// TODO: Update this to api
function LedgerUpdate({targetPage}) {
  const [theLedger, setTheLedger] = useState({})
  const {ledger, accounts} = useLoaderData()

  useEffect(() => {
    setTheLedger(ledger)
  }, [])

  function onChangeLedger(e, fieldName) {

    let value = e.target.value
    if (value.split(' ')[0] === '฿') {
      value = value.split(' ')[1]
    }
    
    setTheLedger((prev) => (
      {...prev, [fieldName]: value}
    ))
  }

  return (
      <div className="my-5">
          <Form action="" method="POST" className="border rounded-xl ml-2 mr-4">
              <DataRow name="Date" inputName="date" value={theLedger.date} ></DataRow>
              <DataRow name="Description" inputName="description" value={theLedger.description} onChangeFn={(e) => onChangeLedger(e, "description")}></DataRow>
              <AccountDropDown data={accounts} inputName="credit_account" mode="credit" selected={ledger.credit_account?.id}></AccountDropDown>
              <DataRow name="Credit Amount" inputName="credit_amount" value={theLedger.credit_amount} onChangeFn={(e) => onChangeLedger(e, "credit_amount")}></DataRow>
              <AccountDropDown data={accounts} inputName="debit_account" mode="debit" selected={ledger.debit_account?.id}></AccountDropDown>
              <DataRow name="Debit Amount" inputName="debit_amount" value={theLedger.debit_amount} onChangeFn={(e) => onChangeLedger(e, "debit_amount")}></DataRow>
              <ButtonSubmit></ButtonSubmit>
                <div className="hidden">
                <input type="hidden" name="accounts" value={JSON.stringify(accounts)} />
                </div>
          </Form>
      </div>
  )
}

function DataRow({name, value, onChangeFn, inputName}) {
    return (
        <div className="flex my-2 mx-2">
            <p className="mr-2">{name}: </p>
            <input name={inputName} type="text" placeholder={name} className="rounded-sm border" defaultValue={value} onChange={onChangeFn} />
            <br />
        </div>
    )
}

function AccountDropDown({data, selected, onChangeFn, mode}) {
    const name = mode === "credit" ? "credit_account" : "debit_account"
    const description = mode === "credit" ? "Credit Account" : "Debit Account"
    return (
        <div className={`flex my-2 mx-2`}>
            <label htmlFor={name} className='mr-2'>{description}: </label>
            <select name={name} id={name} defaultValue={selected} onChange={onChangeFn} className="border rounded-sm">
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

function ButtonSubmit() {
    const navigate = useNavigate()

    return (
        <div className="mb-3 mx-3">
            <button className="hover:cursor-pointer hover:bg-orange-400 rounded-xl bg-orange-500 text-white px-5 py-1" type="submit">Update</button>
            <a className="hover:cursor-pointer hover:bg-red-700 rounded-xl bg-red-500 text-white px-5 py-1.25 ml-2" onClick={() => navigate(-1)}>Back</a>
        </div>
    )
}

export async function loader({params: {theId}}) {
    const ledgerFetched = await fetchLedgerById(theId);
    const accountFetched = await fetchAccounts();
    return {
        ledger: ledgerFetched,
        accounts: accountFetched
    }
}

export async function action({params, request}) {

    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; // Format: "YYYY-MM-DD"

    const formData = await request.formData();
    const data = Object.fromEntries(formData) 
    const selectedCreditData = JSON.parse(data.accounts).filter((x) => x.id == credit_account.value)
    const selectedDebitData = JSON.parse(data.accounts).filter((x) => x.id == debit_account.value)
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
    console.groupEnd("Update Ledger")
    return window.history.back();
}

export default LedgerUpdate