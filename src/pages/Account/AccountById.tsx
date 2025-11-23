import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import LedgerTableC from '../../components/Table/LedgerTableC';
import { fetchLedgerByCreditAccountId, fetchLedgerByDebitAccountId } from '../../services/apiLedger';
import { useDeleteAccounts } from '../../services/implements/useAccountAPI';
import { LedgerType } from '../../types/DefineLedgerType';
import { devDebug, formatCurrency } from '../../utils/utils';
import Loading from '../Loading/Loading';
import { useState } from 'react';

export default function AccountById() {
  const { theId } = useParams()
  const theAccount = useLoaderData()
  const [showCredit, setShowCredit] = useState(false)
  const [showDebit, setShowDebit] = useState(false)

  const variants = {
    showCredit: `ml-5 hover:cursor-pointer px-2 py-1 bg-gray-600 text-white ${showCredit ? 'bg-lime-500 animate-pulse' : ''}`,
    showDebit: `ml-5 hover:cursor-pointer px-2 py-1 bg-gray-600 text-white ${showDebit ? 'bg-lime-500 animate-pulse' : ''}`
  }

  return (
    <>
      <div className='mx-5 my-5 border rounded-2xl p-5'>
        <p>ID: {theAccount.id}</p>
        <p>Description: {theAccount.desc}</p>
        <p>Balance: {theAccount.balance ? formatCurrency(theAccount.balance) : formatCurrency(0)}</p>
        <p>PreviousBalance: {theAccount.previousBalance ? formatCurrency(theAccount.previousBalance) : formatCurrency(0)}</p>
        <p>UpdateDate: {theAccount.updateDate}</p>
        <div className='mt-5'>
          <DeleteButtonC id={theAccount.id}></DeleteButtonC>
          <button className={variants.showCredit} onClick={() => {
            if (showDebit === true && showCredit === false) {
              setShowDebit((prev) => !prev)
            }
            setShowCredit((prev) => !prev)
          }}>Show Credit</button>
          <button className={variants.showDebit} onClick={() => {
            if (showDebit === false && showCredit === true) {
              setShowCredit((prev) => !prev)
            }
            setShowDebit((prev) => !prev)
          }}>Show Debit</button>
        </div>
      </div>
      <div>
        {showCredit ?
          <ShowCreditOrDebitC theId={theId} mode='credit'></ShowCreditOrDebitC>
          : <></>
        }

        {showDebit ?
          <ShowCreditOrDebitC theId={theId} mode='debit'></ShowCreditOrDebitC>
          : <></>}
      </div>
    </>
  )
}

function ShowCreditOrDebitC({ theId, mode }: { theId?: String, mode: "credit" | "debit" }) {
  const ref = {
    credit: {
      queryKey: `accountCreditLedgers_${theId}`,
      fetchFn: fetchLedgerByCreditAccountId
    },
    debit: {
      queryKey: `accountDebitLedgers_${theId}`,
      fetchFn: fetchLedgerByDebitAccountId
    }
  }
  const handle = mode === 'credit' ? ref.credit : ref.debit

  const { data: ledgers, isLoading, isError } = useQuery<LedgerType[]>({
    queryKey: [handle.queryKey],
    queryFn: () => handle.fetchFn(Number(theId)),
    refetchOnMount: 'always',
    retry: false,
    staleTime: 60 * 1000,
    gcTime: 30 * 1000
    ,
  })

  if (isLoading) return <Loading></Loading>

  return <>
    {
      ledgers !== undefined && !isError ?
        <LedgerTableC data={ledgers!} isLoading={isLoading}></LedgerTableC> :
        <div className='ml-5'>😩 Record not found</div>
    }
  </>
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
    btn: `px-2 py-1 bg-red-500 rounded-xl hover:cursor-pointer text-white`
  }

  function onClickHandler() {
    useDeleteAccountsMutate({ id })
    navigate("/accounts")
  }

  return <>
    <input type="button" value="Delete" className={variants.btn} onClick={onClickHandler} />
  </>
}