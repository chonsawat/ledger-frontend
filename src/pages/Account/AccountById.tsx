import React from 'react'
import { fetchAccountById } from '../../services/apiAccounts';
import { Params, useLoaderData, useNavigate } from 'react-router';
import { devDebug, formatCurrency } from '../../utils/utils';
import { useDeleteAccounts } from './useAccountAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function AccountById() {
  const theAccount = useLoaderData()

  return (
    <div className='mx-5 my-5 border rounded-2xl p-5'>
      <p>ID: {theAccount.id}</p>
      <p>Description: {theAccount.desc}</p>
      <p>Balance: {theAccount.balance ? formatCurrency(theAccount.balance) : formatCurrency(0)}</p>
      <p>PreviousBalance: {theAccount.previousBalance ? formatCurrency(theAccount.previousBalance) : formatCurrency(0)}</p>
      <p>UpdateDate: {theAccount.updateDate}</p>
      <div className='mt-5'>
        <DeleteButtonC id={theAccount.id}></DeleteButtonC>
      </div>
    </div>
  )
}

type DeleteButtonT = {
  id: number
}
function DeleteButtonC({ id }: DeleteButtonT) {
  const queryClient = useQueryClient()
  const { mutate: useDeleteAccountsMutate, } = useMutation({
    mutationFn: useDeleteAccounts,
    onSuccess: () => {
      toast.success("Accounts was deleted")
      queryClient.invalidateQueries({
        queryKey: ["accounts"]
      })
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
  const navigate = useNavigate()

  const variants = {
    btn: `px-2 py-1 bg-red-500 rounded-xl hover:cursor-pointer`
  }

  function onClickHandler() {
    useDeleteAccountsMutate({ id })
    navigate("/accounts")
  }

  return <>
    <input type="button" value="Delete" className={variants.btn} onClick={onClickHandler} />
  </>
}