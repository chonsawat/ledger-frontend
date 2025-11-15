import React, { ChangeEvent, useEffect, useState } from "react"
import { useLoaderData, useNavigate } from "react-router"
import { Form } from "react-router-dom"
import { useForm, UseFormRegisterReturn } from "react-hook-form"

import { useNewLedger } from "../../store/ledgerStore"
import { AccountType } from "../Account/Account"
import { devDebug, useShortcut } from "../../utils/utils"
import { useCreateLedger } from "./useCreateLedger"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"

function LedgerAdding() {
    const navigate = useNavigate()
    const accounts = useLoaderData()
    const [selectedDate, setSelectedDate] = useState("")

    useEffect(() => {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; // Format: "YYYY-MM-DD"
        setSelectedDate(formattedDate)
    }, [])

    useShortcut('Escape', () => {
        navigate(-1)
    })

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm();

    const queryClient = useQueryClient()
    const { mutate: useCreateLedgerMutate } = useMutation({
        mutationFn: useCreateLedger,
        onSuccess: () => {
            toast.success("Ledger successfully added");
            queryClient.invalidateQueries({ queryKey: ["groupOfLedger", "accounts"] });
        },
        onError: (err) => toast.error(err.message),
    });

    function onSubmitHandler(data: any) {
        reset()
        let reqAddData = {
            ...data,
            date: selectedDate
        }
        devDebug("[LedgerAdding] onSubmitHandler - tsx: data", () => {
            console.log(reqAddData)
        })
        useCreateLedgerMutate(reqAddData)
    }

    function onChangeDateHandler(e: ChangeEvent<HTMLInputElement>) {
        let value = e.target.value
        setSelectedDate(value)
    }

    return (
        <div className="my-5">
            <Form onSubmit={handleSubmit(onSubmitHandler)} method="POST" className="border rounded-xl ml-2 mr-4">
                <div className="flex my-2 mx-2 mt-5">
                    <p className="mr-2">Date: </p>
                    <input type="text" placeholder="Date" className="border rounded-sm" defaultValue={selectedDate} {...register("date")} onChange={(e) => onChangeDateHandler(e)} />
                    <br />
                </div>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Description: </p>
                    <input type="text" placeholder="Description" className="border rounded-sm" {...register("description")} />
                    <br />
                </div>
                <CreditAccountDropDown register={register}></CreditAccountDropDown>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Credit Amount: </p>
                    <input type="number" placeholder="Credit Amount" className="border rounded-sm" {...register("credit_amount")} />
                    <br />
                </div>
                <DebitAccountDropDown register={register}></DebitAccountDropDown>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Debit Amount: </p>
                    <input type="number" placeholder="Debit Amount" className="border rounded-sm" {...register("debit_amount")} />
                    <br />
                </div>
                <div className="mb-3 mx-3">
                    <button className="hover:cursor-pointer hover:bg-lime-700 rounded-xl bg-lime-500 text-white px-5 py-1" type="submit">Add</button>
                    <a className="hover:cursor-pointer hover:bg-red-700 rounded-xl bg-red-500 text-white px-5 py-1.25 ml-2" onClick={() => { navigate(-1) }}>Back</a>
                </div>

                <div className="hidden">
                    <input type="hidden" value={JSON.stringify(accounts)} {...register("accounts")} />
                </div>
            </Form>
        </div>
    )
}

function CreditAccountDropDown({ register }: { register: (name: string) => UseFormRegisterReturn<string> }) {
    const accounts = useLoaderData()
    const credit_account: number = useNewLedger().credit_account
    const setCreditAccounts = useNewLedger().setCreditAccount

    function handleAccountChangeCredit(e: React.ChangeEvent<HTMLSelectElement>) {
        setCreditAccounts(Number(e.target.value))
    }

    return (
        <div className="flex my-2 mx-2">
            <label htmlFor="credit_account" className='mr-2'>Credit Account: </label>
            <select {...register("credit_account")} id="credit_account" value={credit_account} onChange={handleAccountChangeCredit} className="border rounded-sm">
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

function DebitAccountDropDown({ register }: { register: (name: string) => UseFormRegisterReturn<string> }) {
    const accounts = useLoaderData()
    const debit_account: number = useNewLedger().debit_account
    const setDebitAccounts = useNewLedger().setDebitAccount

    function handleAccountChangeDebit(e: React.ChangeEvent<HTMLSelectElement>) {
        setDebitAccounts(Number(e.target.value))
    }

    return (
        <div className="flex my-2 mx-2">
            <label htmlFor="debit_account" className='mr-2'>Debit Account: </label>
            <select {...register("debit_account")} id="debit_account" value={debit_account} onChange={handleAccountChangeDebit} className="border rounded-sm">
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

export default LedgerAdding