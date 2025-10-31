import React, { useEffect, useState } from 'react'
import { deleteLedger, fetchLedgerById } from '../../services/apiLedger';
import { Form, redirect, useLoaderData, useNavigate } from 'react-router';
import { formatCurrency } from '../../utils/utils';

function LedgerById() {
  const ledger = useLoaderData()
  const navigate = useNavigate()

  return (
    <div className='my-5'>
        <Form method="DELETE" className="border rounded-xl ml-2 mr-4">
            <div className='px-5'>

                <div className="flex my-2 mx-2 mt-5">
                    <p className="mr-2">Date: </p>
                    <input type="text" placeholder="NULL" className="rounded-sm" disabled value={ledger.date}/>
                    <br />
                </div>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Description: </p>
                    <input type="text" placeholder="NULL" className="rounded-sm" disabled value={ledger.description}/>
                    <br />
                </div>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Credit Account: </p>
                    <input type="text" placeholder="-" className="rounded-sm" disabled value={ledger.credit_account ? ledger.credit_account.desc : '-'}/>
                    <br />
                </div>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Credit Amount: </p>
                    <input type="text" placeholder="NULL" className="rounded-sm" disabled value={ledger.credit_account ? formatCurrency(ledger.credit_amount) : "-"} />
                    <br />
                </div>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Debit Account: </p>
                    <input type="text" placeholder="-" className="rounded-sm" disabled value={ledger.debit_account ? ledger.debit_account.desc : '-'}/>
                    <br />
                </div>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Debit Amount: </p>
                    <input type="text" placeholder="NULL" className="rounded-sm" disabled value={ledger.debit_account ? formatCurrency(ledger.debit_amount) : "-"}/>
                    <br />
                </div>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Total Credit Balance: </p>
                    <input type="text" placeholder="-" className="rounded-sm" disabled value={ledger.credit_account?formatCurrency(ledger.credit_account.balance):'-'}/>
                    <br />
                </div>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Total Debit Balance: </p>
                    <input type="text" placeholder="-" className="rounded-sm" disabled value={ledger.debit_account?formatCurrency(ledger.debit_account.balance):'-'}/>
                    <br />
                </div>
                <ButtonSubmit></ButtonSubmit>
            </div>
        </Form>
    </div>
  )
}

function ButtonSubmit() {
    const navigate = useNavigate()

    return (
        <div className="mb-5 mx-3 mt-3">
            <button className="hover:cursor-pointer hover:bg-red-400 rounded-xl bg-red-500 text-white px-5 py-1" type="submit">Delete</button>
            <a className="hover:cursor-pointer hover:bg-gray-700 rounded-xl bg-gray-500 text-white px-5 py-1.5 ml-3" onClick={() => navigate(-1)}>Back</a>
        </div>
    )
}

export async function loader({params: {theId}}) {
    const data = await fetchLedgerById(theId);
    return data
}

export async function action({params}) {
    const ledger = {
        id: params.theId
    }
    console.group("Delete Ledger")
    console.log(ledger);
    
    const deletedLedger = await deleteLedger(ledger);
    console.groupEnd("Delete Ledger")
    return redirect("/ledger");
}

export default LedgerById