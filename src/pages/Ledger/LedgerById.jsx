import React, { useEffect, useState } from 'react'
import { fetchLedgerById } from '../../services/apiLedger';
import { useLoaderData, useNavigate } from 'react-router';
import { formatCurrency } from '../../utils/utils';

function LedgerById() {
  const ledger = useLoaderData()
  const navigate = useNavigate()

  return (
    <div className='my-5'>
        <form action="#" method="POST" className="border rounded rounded-xl ml-2 mr-4">
            <div className="flex my-2 mx-2 mt-5">
                <p className="mr-2">Date: </p>
                <input type="text" placeholder="NULL" className="rounded rounded-sm" disabled value={ledger.date}/>
                <br />
            </div>
            <div className="flex my-2 mx-2">
                <p className="mr-2">Description: </p>
                <input type="text" placeholder="NULL" className="rounded rounded-sm" disabled value={ledger.description}/>
                <br />
            </div>
            <div className="flex my-2 mx-2">
                <p className="mr-2">Credit Account: </p>
                <input type="text" placeholder="NULL" className="rounded rounded-sm" disabled value={ledger.credit_account}/>
                <br />
            </div>
            <div className="flex my-2 mx-2">
                <p className="mr-2">Credit Amount: </p>
                <input type="text" placeholder="NULL" className="rounded rounded-sm" disabled value={formatCurrency(ledger.credit_amount)}/>
                <br />
            </div>
            <div className="flex my-2 mx-2">
                <p className="mr-2">Debit Account: </p>
                <input type="text" placeholder="NULL" className="rounded rounded-sm" disabled value={ledger.debit_account}/>
                <br />
            </div>
            <div className="flex my-2 mx-2">
                <p className="mr-2">Debit Amount: </p>
                <input type="text" placeholder="NULL" className="rounded rounded-sm" disabled value={formatCurrency(ledger.debit_amount)}/>
                <br />
            </div>
            <div className="flex my-2 mx-2">
                <p className="mr-2">Total Credit Balance: </p>
                <input type="text" placeholder="NULL" className="rounded rounded-sm" disabled value={formatCurrency(ledger.total_credit_balance)}/>
                <br />
            </div>
            <div className="flex my-2 mx-2">
                <p className="mr-2">Total Debit Balance: </p>
                <input type="text" placeholder="NULL" className="rounded rounded-sm" disabled value={formatCurrency(ledger.total_debit_balance)}/>
                <br />
            </div>
            <div className="my-3 mx-3">
                <a className="hover:cursor-pointer hover:bg-red-700 rounded rounded-xl bg-red-500 text-white px-5 py-1.25 ml-2" onClick={() => {navigate(-1)}}>Back</a>
            </div>
        </form>
    </div>
  )
}

export async function loader({params: {theId}}) {
    const data = await fetchLedgerById(theId);
    return data
}

export default LedgerById