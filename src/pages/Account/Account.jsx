import { useEffect, useState } from "react"
import { formatCurrency } from "../../utils/utils"
import { useLoaderData } from "react-router"
import { fetchAccounts } from "../../services/apiAccounts"

function Accounts() {

    const accounts = useLoaderData()

    return (
        <div>
            <Table accounts={accounts}></Table>
            <AddBtn></AddBtn>
        </div>
    )
}

function Table({accounts}) {
    return (
        <div className="table-ledger-content my-5 mx-5">
            <div className="flex flex-col items-center">
                <table className="text-center min-w-max shadow-md w-full h-full">
                    <thead>
                    <tr>
                        <th className="border-spacing-5 rounded-2xl py-3 px-2 bg-slate-800 text-white">ID</th>
                        <th className="border-spacing-5 rounded-2xl py-3 px-2 bg-slate-800 text-white w-[50%]">Account</th>
                        <th className="border-spacing-5 rounded-2xl py-3 px-2 bg-slate-800 text-white">Balance</th>
                        <th className="border-spacing-5 rounded-2xl py-3 px-2 bg-slate-800 text-white w-4">Update</th>
                    </tr>
                    </thead>
                    <tbody>
                        <TableRow accounts={accounts}></TableRow>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function TableRow({accounts}) {
    return (
        <>
            {accounts.map((x) => {
                return (
                    <tr key={x.id} className="hover:text-bold hover:text-black hover:bg-gray-200">
                        <td className="p-4 border-b border-gray-200" >{x.id}</td>
                        <td className="p-4 border-b border-gray-200" >{x.desc}</td>
                        <td className="p-4 border-b border-gray-200 text-end currency-text ">{formatCurrency(x.balance)}</td>
                        <UpdateBtn ></UpdateBtn>
                    </tr>
                )
            })}
        </>
            
    )
}

function UpdateBtn() {
    return (
        <td className="p-4 border-b border-gray-200">
            <a className="hover:cursor-pointer hover:bg-orange-500 bg-gray-200 text-white p-3 rounded-xl">Update</a>
        </td>
    )
}

function AddBtn() {
    return (
        <div className="mx-5 add-ledger-content mb-5">
            <a className="hover:cursor-pointer border rounded-xl p-3 bg-gray-300 hover:bg-lime-500 text-bold text-white animate-bounce">Add Account</a>
        </div>
    )
}

export async function loader() {
    const data = fetchAccounts()
    return data
}

export default Accounts