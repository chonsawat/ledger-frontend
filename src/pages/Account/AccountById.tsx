import React from 'react'
import { fetchAccountById } from '../../services/apiAccounts';
import { useLoaderData } from 'react-router';
import { formatCurrency } from '../../utils/utils';

export default function AccountById() {
  const theAccount = useLoaderData()
  
  return (
    <div className='mx-5 my-5 border rounded-2xl p-5'>
      <p>ID: {theAccount.id}</p>
      <p>Description: {theAccount.desc}</p>
      <p>Balance: {theAccount.balance ? formatCurrency(theAccount.balance) : formatCurrency(0)}</p>
      <p>PreviousBalance: {theAccount.previousBalance ? formatCurrency(theAccount.previousBalance) : formatCurrency(0)}</p>
      <p>UpdateDate: {theAccount.updateDate}</p>
    </div>
  )
}

export async function loader({params: {theId}}: {params: {theId: number}}) {
    const data = await fetchAccountById(theId);
    return data
}