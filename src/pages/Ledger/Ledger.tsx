import { formatCurrency, useShortcut } from "../../utils/utils";
import { fetchLedgers } from "../../services/apiLedger";
import { redirect, useLoaderData, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { LedgerType } from "../../store/ledgerStore";

function Ledger() {
    const theLedger = useLoaderData()
    const [searchText, setSerachText] = useState("")
    const filteredLedger = theLedger.filter((x: LedgerType) => x.description ? x.description.toLowerCase().includes(searchText.toLowerCase()) : null)

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setSerachText(e.target.value)
    }

    return (
        <div>
            <div className="table-ledger-content my-5 mx-5">
                <SearchBar onChangeFn={onChangeHandler}></SearchBar>
                <div className="flex flex-col items-center">
                    <table className="text-center min-w-max shadow-md w-full h-full">
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
                        <tbody>
                            {filteredLedger.length !== 0 ? filteredLedger.map((ledger: LedgerType) =>
                                <FoundRow key={ledger.id} ledger={ledger}></FoundRow>
                            ) :
                                <NotFoundRow></NotFoundRow>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function AddButton() {

    const navigate = useNavigate()
    const location = useLocation()

    function onClickAddHandler() {
        navigate(`/ledger/add`,)
    }

    useShortcut('A', () => {
        onClickAddHandler()
    })  

    return (
        <div className="mx-5 add-ledger-content my-5">
            <a className="hover:cursor-pointer border rounded-xl p-3 bg-gray-300 hover:bg-lime-500 text-bold text-white animate-bounce"
                onClick={onClickAddHandler}

            >
                Add Ledger</a>
        </div>
    )
}

function SearchBar({ onChangeFn }: { onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) => void }) {

    return (
        <div className="flex">
            <AddButton></AddButton>
            <input type="text" placeholder="Search Desc" className="w-420 mt-2.5 mb-5 py-2 px-3 border rounded-xl border-gray-500" onChange={(e) => onChangeFn(e)} />
        </div>
    )
}



function FoundRow({ ledger }: { ledger: LedgerType }) {
    const navigate = useNavigate()
    
    function onClickDateHandler(theId: number) {
        // navigate(`/ledger/${theId}`)
    }

    function onClickUpdateHandler(theId: number) {
        navigate(`/ledger/update/${theId}`)
    }

    return (
        <tr key={ledger.id} className="hover:text-bold hover:text-black hover:bg-gray-200">
            <td className="p-4 border-b border-gray-200 hover:cursor-pointer" onClick={() => { onClickDateHandler(ledger.id!) }}>{ledger.date}</td>
            <td className="p-4 border-b border-gray-200" >{ledger.description}</td>
            <td className="p-4 border-b border-gray-200" >{ledger.credit_account ? ledger.credit_account.desc : ''}</td>
            <td className="p-4 border-b border-gray-200 text-end" >{formatCurrency(ledger.credit_amount)}</td>
            <td className="p-4 border-b border-gray-200" >{ledger.debit_account ? ledger.debit_account.desc : ''}</td>
            <td className="p-4 border-b border-gray-200 text-end" >{formatCurrency(ledger.debit_amount)}</td>
            <td className="p-4 border-b border-gray-200">
                <a className="hover:bg-orange-500 hover:cursor-pointer bg-gray-200 text-white p-3 rounded-xl"
                    onClick={() => { onClickUpdateHandler(ledger.id!) }}
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
                <a className="bg-gray-200 text-white p-3 rounded-xl cursor-not-allowed opacity-50">Update</a>
            </td>
        </tr>
    )
}

export default Ledger