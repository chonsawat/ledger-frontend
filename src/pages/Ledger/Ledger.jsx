import { formatCurrency } from "../../utils/utils";
import { fetchLedgers } from "../../services/apiLedger";
import { redirect, useLoaderData, useNavigate } from "react-router";


function Ledger() {
    const theLedger = useLoaderData()
    const navigate = useNavigate()

    function onClickDateHandler(theId) {
        navigate(`/ledger/${theId}`)
    }

    function onClickUpdateHandler(theId) {
        navigate(`/ledger/update/${theId}`)
    }

    return (
        <div>
            <div className="table-ledger-content my-5 mx-5">
                <div className="flex flex-col items-center">
                    <table className="text-center min-w-max shadow-md w-full h-full">
                        <thead>
                            <tr>
                                <th className="border-spacing-5 rounded rounded-2xl py-3 px-2 bg-slate-800 text-white">Date</th>
                                <th className="border-spacing-5 rounded rounded-2xl py-3 px-2 bg-slate-800 text-white w-[50%]">Detail</th>
                                <th className="border-spacing-5 rounded rounded-2xl py-3 px-2 bg-slate-800 text-white">Credit Account</th>
                                <th className="border-spacing-5 rounded rounded-2xl py-3 px-2 bg-slate-800 text-white">Credit Amount</th>
                                <th className="border-spacing-5 rounded rounded-2xl py-3 px-2 bg-slate-800 text-white">Debit Account</th>
                                <th className="border-spacing-5 rounded rounded-2xl py-3 px-2 bg-slate-800 text-white">Debit Amount</th>
                                <th className="border-spacing-5 rounded rounded-2xl py-3 px-2 bg-slate-800 text-white w-4">Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {theLedger.map((ledger) => 
                                <tr key={ledger.id} className="hover:text-bold hover:text-black hover:bg-gray-200">
                                    <td className="p-4 border-b border-gray-200 hover:cursor-pointer" onClick={() => {onClickDateHandler(ledger.id)}}>{ledger.date}</td>
                                    <td className="p-4 border-b border-gray-200" >{ledger.description}</td>
                                    <td className="p-4 border-b border-gray-200" >{ledger.credit_account}</td>
                                    <td className="p-4 border-b border-gray-200 text-end" >{formatCurrency(ledger.credit_amount)}</td>
                                    <td className="p-4 border-b border-gray-200" >{ledger.debit_account}</td>
                                    <td className="p-4 border-b border-gray-200 text-end" >{formatCurrency(ledger.debit_amount)}</td>
                                    <td className="p-4 border-b border-gray-200"> 
                                        <a className="hover:bg-orange-500 hover:cursor-pointer bg-gray-200 text-white p-3 rounded rounded-xl"
                                            onClick={() => {onClickUpdateHandler(ledger.id)}}
                                        >Update</a>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <AddButton></AddButton>
        </div>
    )
}

function AddButton() {

    const navigate = useNavigate()

    function onClickAddHandler(theId) {
        navigate(`/ledger/add`)
    }

    return (
        <div className="mx-5 add-ledger-content my-5">
                <a className="hover:cursor-pointer border rounded rounded-xl p-3 bg-gray-300 hover:bg-lime-500 text-bold text-white animate-bounce" 
                    onClick={onClickAddHandler}>
                    Add Ledger</a>
        </div>
    )
}

export async function loader() {
    const data = await fetchLedgers()
    return data
}

export default Ledger