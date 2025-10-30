import { Form, useLoaderData, useLocation, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { fetchLedgerById } from "../../services/apiLedger"
import { fetchAccounts } from "../../services/apiAccounts"

// TODO: Update this to api
function LedgerUpdate() {
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

    console.log(value);
    
    setTheLedger((prev) => (
      {...prev, [fieldName]: value}
    ))
  }

  return (
      <div className="my-5">
          <Form action="" method="POST" className="border rounded-xl ml-2 mr-4">
              <DataRow name="Date" value={theLedger.date} ></DataRow>
              <DataRow name="Description" value={theLedger.description} onChangeFn={(e) => onChangeLedger(e, "description")}></DataRow>
              <DataRow name="Credit Account" value={theLedger.credit_account?.desc} onChangeFn={(e) => onChangeLedger(e, "credit_account")}></DataRow>
              <AccountDropDown data={accounts} mode="credit" selected={ledger.credit_account?.id}></AccountDropDown>
              <DataRow name="Credit Amount" value={theLedger.credit_amount} onChangeFn={(e) => onChangeLedger(e, "credit_amount")}></DataRow>
              <AccountDropDown data={accounts} mode="debit" selected={ledger.debit_account?.id}></AccountDropDown>
              <DataRow name="Debit Amount" value={theLedger.debit_amount} onChangeFn={(e) => onChangeLedger(e, "debit_amount")}></DataRow>
              <ButtonSubmit></ButtonSubmit>
          </Form>
      </div>
  )
}

function DataRow({name, value, onChangeFn}) {
    return (
        <div className="flex my-2 mx-2">
            <p className="mr-2">{name}: </p>
            <input type="text" placeholder={name} className="rounded-sm border" defaultValue={value} onChange={onChangeFn}/>
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

export async function action({request}) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) 
    const selectedCreditData = JSON.parse(data.accounts).filter((x) => x.id == credit_account.value)
    const selectedDebitData = JSON.parse(data.accounts).filter((x) => x.id == debit_account.value)
    const ledger = {
        date: data.date,
        description: data.description,
        credit_account: selectedCreditData[0],
        debit_account: selectedDebitData[0],
        credit_amount: data.credit_amount,
        debit_amount: data.debit_amount,
    }
    console.group("Create Ledger")
    console.log(ledger);
    const newLedger = await addLedger(ledger);
    console.log(newLedger);
    console.groupEnd("Create Ledger")
    return redirect("/ledger");
}

export default LedgerUpdate