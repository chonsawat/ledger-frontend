import { useLoaderData, useNavigate } from "react-router"
import { formatCurrency } from "../../utils/utils"
import { useEffect, useState } from "react"

function LedgerUpdate() {
  const [theLedger, setTheLedger] = useState({})
  const ledger = useLoaderData()
  const navigate = useNavigate()

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
          <form action="#" method="POST" className="border rounded-xl ml-2 mr-4">
              <div className="flex my-2 mx-2 mt-5">
                  <p className="mr-2">Date: </p>
                  <input type="text" placeholder="Date" className="rounded-sm border  " value={theLedger.date} onChange={(e) => onChangeLedger(e, "date")}/>
                  <br />
              </div>
              <div className="flex my-2 mx-2">
                  <p className="mr-2">Description: </p>
                  <input type="text" placeholder="Description" className="rounded-sm border " value={theLedger.description} onChange={(e) => onChangeLedger(e, "description")}/>
                  <br />
              </div>
              <div className="flex my-2 mx-2">
                  <p className="mr-2">Credit Account: </p>
                  <input type="text" placeholder="Credit Account" className="rounded-sm border  " value={theLedger.credit_account} onChange={(e) => onChangeLedger(e, "credit_account")}/>
                  <br />
              </div>
              <div className="flex my-2 mx-2">
                  <p className="mr-2">Credit Amount: </p>
                  <input type="text" placeholder="Credit Amount" className="rounded-sm border " value={theLedger.credit_amount} onChange={(e) => onChangeLedger(e, "credit_amount")}/>
                  <br />
              </div>
              <div className="flex my-2 mx-2">
                  <p className="mr-2">Debit Account: </p>
                  <input type="text" placeholder="Debit Account" className="rounded-sm border " value={theLedger.debit_account} onChange={(e) => onChangeLedger(e, "debit_account")}/>
                  <br />
              </div>
              <div className="flex my-2 mx-2">
                  <p className="mr-2">Debit Amount: </p>
                  <input type="text" placeholder="Debit Amount" className="rounded-sm border  " value={theLedger.debit_amount} onChange={(e) => onChangeLedger(e, "debit_amount")}/>
                  <br />
              </div>
              <div className="flex my-2 mx-2">
                  <p className="mr-2">Total Credit Balance: </p>
                  <input type="text" placeholder="Total Credit Balance" className="rounded-sm border  " value={theLedger.total_credit_balance} onChange={(e) => onChangeLedger(e, "total_credit_balance")}/>
                  <br />
              </div>
              <div className="flex my-2 mx-2">
                  <p className="mr-2">Total Debit Balance: </p>
                  <input type="text" placeholder="Total Debit Balance" className="rounded-sm border " value={theLedger.total_debit_balance} onChange={(e) => onChangeLedger(e, "total_debit_balance")}/>
                  <br />
              </div>
              <div className="mb-3 mx-3">
                  <button className="hover:cursor-pointer hover:bg-lime-700 rounded-xl bg-lime-500 text-white px-5 py-1" type="submit">Add</button>
                  <a className="hover:cursor-pointer hover:bg-red-700 rounded-xl bg-red-500 text-white px-5 py-1.25 ml-2" onClick={() => navigate(-1)}>Back</a>
              </div>
          </form>
      </div>
  )
}

export default LedgerUpdate