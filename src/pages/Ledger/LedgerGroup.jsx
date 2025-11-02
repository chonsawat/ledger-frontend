import { formatCurrency, useShortcut } from "../../utils/utils";
import { fetchLedgers, fetchLedgersAsGroup } from "../../services/apiLedger";
import { redirect, useLoaderData, useNavigate } from "react-router";
import { useEffect, useState } from "react";


function LedgerGroup() {
    const groupOfLedger = useLoaderData()
    const [searchText, setSerachText] = useState("")

    const navigate = useNavigate()

    function onClickDateHandler(theId) {
        navigate(`/ledger/${theId}`)
    }

    function onClickUpdateHandler(theId) {
        navigate(`/ledger/update/${theId}`)
    }

    function onChangeHandler(e) {
        setSerachText(e.target.value)
    }

    return (
        <div>
            <div className="table-ledger-content my-5 mx-5">
                <SearchBar onChangeFn={onChangeHandler}></SearchBar>
                <div className="flex flex-col items-center">
                  {Object.entries(groupOfLedger).length > 0 ? Object.entries(groupOfLedger)?.map(([key, ledgerByDate]) => {
                    const filteredLedger = ledgerByDate.filter((x) => x.description ? x.description.toLowerCase().includes(searchText.toLowerCase()) : null )
                    
                    if (filteredLedger.length > 0) {
                        let creditTotal = 0
                        let debitTotal = 0
                        
                        return (
                            <div key={key} className="w-full">
                                <table className="text-center min-w-max shadow-md w-full">
                                    <TableHeader></TableHeader>
                                    <tbody>
                                        {filteredLedger?.map((ledger) => {
                                                if (ledger.credit_amount !== null) {
                                                    creditTotal = creditTotal + ledger.credit_amount
                                                }
                                                if (ledger.debit_amount !== null) {
                                                    debitTotal = debitTotal + ledger.debit_amount
                                                }
                                                return (
                                                        <FoundRow key={ledger.id} onClickDateHandler={onClickDateHandler} ledger={ledger} onClickUpdateHandler={onClickUpdateHandler}></FoundRow>
                                                )
                                            }
                                            )
                                        }
                                    </tbody>
                                </table>
                                <div className="flex my-3 w-full justify-end">
                                    <div className="flex border rounded-2xl px-3 py-2 border-gray-300 ">
                                        <p className="mx-5">Total Credit: {formatCurrency(creditTotal)}</p>
                                        <p className="mx-5">Total Debit: {formatCurrency(debitTotal)}</p>
                                    </div>
                                </div>
                                <div className="mb-10"></div>
                            </div>
                        ) 
                    }

                  }) : "NONE" }
                </div>
            </div>
        </div>
    )
}

function TableHeader() {
  return (
    <thead>
      <tr>
          <th className="border-spacing-5 rounded-2xl py-3 px-2 bg-slate-800 text-white">Date</th>
          <th className="border-spacing-5 rounded-2xl py-3 px-2 bg-slate-800 text-white w-[50%]">Detail</th>
          <th className="border-spacing-5 rounded-2xl py-3 px-2 bg-slate-800 text-white">Credit Account</th>
          <th className="border-spacing-5 rounded-2xl py-3 px-2 bg-slate-800 text-white">Credit Amount</th>
          <th className="border-spacing-5 rounded-2xl py-3 px-2 bg-slate-800 text-white">Debit Account</th>
          <th className="border-spacing-5 rounded-2xl py-3 px-2 bg-slate-800 text-white">Debit Amount</th>
          <th className="border-spacing-5 rounded-2xl py-3 px-2 bg-slate-800 text-white w-4">Update</th>
      </tr>
  </thead>
  )
}

function AddButton() {

    const navigate = useNavigate()

    function onClickAddHandler(theId) {
        navigate(`/ledger/add`)
    }

    useShortcut('a', () => {
        onClickAddHandler()
    })  

    return (
        <div className="mx-5 add-ledger-content my-5 sm:w-[20%] md:w-[20%] md:mr-0">
                <a className="hover:cursor-pointer border rounded-xl p-3 bg-gray-300 hover:bg-lime-500 text-bold text-white animate-bounce" 
                    onClick={onClickAddHandler}>
                    Add Ledger</a>
        </div>
    )
}

function SearchBar({onChangeFn}) {

    return (
        <div className="flex">
            <AddButton></AddButton>
            <input type="text" placeholder="Search Desc" className="w-420 mt-2.5 mb-5 py-2 px-3 border rounded-xl border-gray-500 sm:w-[75%] md:w-[90%] lg:w-full" onChange={(e) => onChangeFn(e)}/>
        </div>
    )
}

function FoundRow({ledger, onClickDateHandler, onClickUpdateHandler}) {
    return (
        <tr key={ledger.id} className="hover:text-bold hover:text-black hover:bg-gray-200">
            <td className="p-4 border-b border-gray-200 hover:cursor-pointer" onClick={() => {onClickDateHandler(ledger.id)}}>{ledger.date}</td>
            <td className="p-4 border-b border-gray-200" >{ledger.description}</td>
            <td className="p-4 border-b border-gray-200" >{ledger.credit_account ? ledger.credit_account.desc: ''}</td>
            <td className="p-4 border-b border-gray-200 text-end" >{formatCurrency(ledger.credit_amount)}</td>
            <td className="p-4 border-b border-gray-200" >{ledger.debit_account ? ledger.debit_account.desc : ''}</td>
            <td className="p-4 border-b border-gray-200 text-end" >{formatCurrency(ledger.debit_amount)}</td>
            <td className="p-4 border-b border-gray-200"> 
                <a className="hover:bg-orange-500 hover:cursor-pointer bg-gray-200 text-white p-3 rounded-xl"
                    onClick={() => {onClickUpdateHandler(ledger.id)}}
                >Update</a>
            </td>
        </tr>        
    )
}

function NotFoundRow() {
    return (
        <tr className="hover:text-bold hover:text-black hover:bg-gray-200">
            <td className="p-4 border-b border-gray-200 hover:cursor-pointer" >-</td>
            <td className="p-4 border-b border-gray-200" >-</td>
            <td className="p-4 border-b border-gray-200" >-</td>
            <td className="p-4 border-b border-gray-200 text-end" >-</td>
            <td className="p-4 border-b border-gray-200" >-</td>
            <td className="p-4 border-b border-gray-200 text-end" >-</td>
            <td className="p-4 border-b border-gray-200"> 
                <a className="bg-gray-200 text-white p-3 rounded-xl" disabled>Update</a>
            </td>
        </tr>
    )
}

export async function loader() {
    const data = await fetchLedgersAsGroup()
    return data
}

export default LedgerGroup