import { formatCurrency } from "../../utils/utils"
import { useNavigate } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { usefetchAccounts } from "./useFetchAccounts"
import Loading from "../Loading/Loading"
import { useAccounts } from "../../store/accountStore"
import { useEffect } from "react"
import { AccountType } from "./DefineAccountsType"

function Accounts() {
    const { data, isLoading } = useQuery<AccountType[]>({
        queryKey: ["accounts"],
        queryFn: usefetchAccounts,
    });
    const setAccounts = useAccounts((state) => state.setAccounts)

    useEffect(() => {
        setAccounts(data!)
    }, [data])

    if (isLoading) return <Loading></Loading>

    return (
        <div>
            <AccountTable></AccountTable>
            <AddBtn></AddBtn>
        </div>
    )
}

function AccountTable() {
    return (
        <div className="table-ledger-content my-5 mx-5">
            <div className="flex flex-col items-center">
                <table className="text-center min-w-max shadow-md w-full h-full">
                    <AccountHeading></AccountHeading>
                    <AccountRow></AccountRow>
                </table>
            </div>
        </div>
    )
}

function AccountHeading() {
    const variants = {
        header: `
            text-sm font-medium border-spacing-5 rounded-2xl py-2 px-2 bg-slate-800 text-white
        `,
        header2: `
            text-sm font-medium border-spacing-5 rounded-2xl py-2 px-2 bg-slate-800 text-white
            w-[50%]
        `,
        header3: `
            text-sm font-medium border-spacing-5 rounded-2xl py-2 px-2 bg-slate-800 text-white
            w-4
        `,
    }
    return (
        <thead>
            <tr>
                <th className={variants.header}>ID</th>
                <th className={variants.header2}>Account</th>
                <th className={variants.header}>Balance</th>
                <th className={variants.header3}>Update</th>
            </tr>
        </thead>
    )
}

function AccountRow() {
    const navigate = useNavigate()

    const accounts = useAccounts((state) => state.accounts)

    function onClickDateHandler(theId: number) {
        navigate(`/accounts/${theId}`)
    }

    return (
        <tbody>
            {accounts?.map((x) => {
                return (
                    <tr key={x.id} className="hover:text-bold hover:text-black hover:bg-gray-200">
                        <td className="p-4 border-b border-gray-200 hover:cursor-pointer" onClick={() => onClickDateHandler(x.id)}>{x.id}</td>
                        <td className="p-4 border-b border-gray-200" >{x.desc}</td>
                        <td className="p-4 border-b border-gray-200 text-end currency-text ">{formatCurrency(x.balance)}</td>
                        <UpdateBtn id={x.id}></UpdateBtn>
                    </tr>
                )
            })}
        </tbody>
    )
}

function UpdateBtn({ id }: { id: number }) {
    const navigate = useNavigate()
    const variants = {
        update: `
            hover:cursor-pointer hover:bg-orange-500 bg-gray-200 text-white p-2 rounded-xl
        `
    }

    function onClickHandler(theId: number) {
        navigate(`/accounts/update/${theId}`)
    }

    return (
        <td className="p-4 border-b border-gray-200">
            <a className={variants.update} onClick={() => { onClickHandler(id) }}>Update</a>
        </td>
    )
}

function AddBtn() {
    const navigate = useNavigate();

    const variants = {
        addBtn: `
            hover:cursor-pointer border rounded-xl p-3 bg-gray-300 hover:bg-lime-500 text-bold text-white animate-bounce
        `,
    }


    return (
        <div className="mx-5 add-ledger-content mb-5">
            <a className={variants.addBtn} onClick={() => { navigate("/accounts/add") }}>Add Account</a>
        </div>
    )
}

export default Accounts