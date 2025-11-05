import React, { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute, useEffect, useState } from "react"
import { redirect, useLoaderData, useNavigate } from "react-router"
import { Form } from "react-router-dom"
import { atom, useAtom, useAtomValue } from "jotai"

import { newLedgerDetail, newLedgerDetailAccountSelected } from "../../store/ledgerStore"
import { addLedger } from "../../services/apiLedger"
import { AccountType } from "../Account/Account"
import { LedgerType } from "../../store/ledgerStore"
import { useShortcut } from "../../utils/utils"

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

    return (
        <div className="my-5">
            <Form method="POST" className="border rounded-xl ml-2 mr-4">
                <div className="flex my-2 mx-2 mt-5">
                    <p className="mr-2">Date: </p>
                    <input name="date" type="text" placeholder="Date" className="border rounded-sm" defaultValue={selectedDate} />
                    <br />
                </div>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Description: </p>
                    <input name="description" type="text" placeholder="Description" className="border rounded-sm" />
                    <br />
                </div>
                <CreditAccountDropDown></CreditAccountDropDown>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Credit Amount: </p>
                    <input name="credit_amount" type="number" placeholder="Credit Amount" className="border rounded-sm" />
                    <br />
                </div>
                <DebitAccountDropDown></DebitAccountDropDown>
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
                    <a className="hover:cursor-pointer hover:bg-red-700 rounded-xl bg-red-500 text-white px-5 py-1.25 ml-2" onClick={() => { navigate(-1) }}>Back</a>
                </div>

                <div className="hidden">
                    <input type="hidden" name="accounts" value={JSON.stringify(accounts)} />
                </div>
            </Form>
        </div>
    )
}

function CreditAccountDropDown() {
    const accounts = useLoaderData()
    const [newLedgerDetailAccounts, setDetailAccounts] = useAtom(newLedgerDetailAccountSelected)

    function handleAccountChangeCredit(e: React.ChangeEvent<HTMLSelectElement>) {
        setDetailAccounts({ ...newLedgerDetailAccounts, credit_account: Number(e.target.value) })
    }

    return (
        <div className="flex my-2 mx-2">
            <label htmlFor="credit_account" className='mr-2'>Credit Account: </label>
            <select name="credit_account" id="credit_account" value={newLedgerDetailAccounts.credit_account} onChange={handleAccountChangeCredit} className="border rounded-sm">
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

function DebitAccountDropDown() {
    const accounts = useLoaderData()
    const [newLedgerDetailAccounts, setDetailAccounts] = useAtom(newLedgerDetailAccountSelected)

    function handleAccountChangeDebit(e: React.ChangeEvent<HTMLSelectElement>) {
        setDetailAccounts({ ...newLedgerDetailAccounts, debit_account: Number(e.target.value) })
    }

    return (
        <div className="flex my-2 mx-2">
            <label htmlFor="debit_account" className='mr-2'>Debit Account: </label>
            <select name="debit_account" id="debit_account" value={newLedgerDetailAccounts.debit_account} onChange={handleAccountChangeDebit} className="border rounded-sm">
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

export async function action({ request }: any) {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; // Format: "YYYY-MM-DD"

    const formData = await request.formData();
    const data = Object.fromEntries(formData)

    const selectedCreditData = JSON.parse(data.accounts).filter((x: AccountType) => x.id == data.credit_account)
    const selectedDebitData = JSON.parse(data.accounts).filter((x: AccountType) => x.id == data.debit_account)
    const ledger: LedgerType = {
        id: undefined,
        date: data.date,
        description: data.description,
        credit_account: selectedCreditData[0] ? { ...selectedCreditData[0], updateDate: formattedDate } : null,
        debit_account: selectedDebitData[0] ? { ...selectedDebitData[0], updateDate: formattedDate } : null,
        credit_amount: data.credit_amount,
        debit_amount: data.debit_amount,
    }

    console.group("Create Ledger")
    // console.log(ledger);
    const addedLedger = await addLedger(ledger);
    console.groupEnd()
    return window.history.back()
}

export default LedgerAdding