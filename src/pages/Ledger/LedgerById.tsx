import React, { useEffect, useState } from 'react'
import { deleteLedger, fetchLedgerById } from '../../services/apiLedger';
import { ActionFunctionArgs, Form, LoaderFunctionArgs, redirect, useLoaderData, useNavigate, useParams } from 'react-router';
import { devDebug, formatCurrency } from '../../utils/utils';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDeleteLedgerById } from './useDeleteLedger';
import toast from 'react-hot-toast';

function LedgerById() {
    const ledger = useLoaderData()
    const navigate = useNavigate()
    const params = useParams()

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm();

    const queryClient = useQueryClient()
    const { mutate: useDeleteLedgerByIdMutate } = useMutation({
        mutationFn: useDeleteLedgerById,
        onSuccess: () => {
            toast.success("Ledger successfully deleted");
            queryClient.invalidateQueries({ queryKey: ["groupOfLedger"] });
        },
        onError: (err) => toast.error(err.message),
    });

    function onSubmitHandler() {
        reset()
        devDebug("[LedgerById] onSubmitHandler - tsx: data", () => {
            console.log(params)
        })
        useDeleteLedgerByIdMutate(params)
    }

    return (
        <div className='my-5'>
            <Form onSubmit={handleSubmit(onSubmitHandler)} method="DELETE" className="border rounded-xl ml-2 mr-4">
                <div className='px-5'>

                    <div className="flex my-2 mx-2 mt-5">
                        <p className="mr-2">Date: </p>
                        <input type="text" placeholder="NULL" className="rounded-sm" disabled value={ledger?.date} />
                        <br />
                    </div>
                    <div className="flex my-2 mx-2">
                        <p className="mr-2">Description: </p>
                        <input type="text" placeholder="NULL" className="rounded-sm" disabled value={ledger?.description} />
                        <br />
                    </div>
                    <div className="flex my-2 mx-2">
                        <p className="mr-2">Credit Account: </p>
                        <input type="text" placeholder="-" className="rounded-sm" disabled value={ledger?.credit_account ? ledger?.credit_account.desc : '-'} />
                        <br />
                    </div>
                    <div className="flex my-2 mx-2">
                        <p className="mr-2">Credit Amount: </p>
                        <input type="text" placeholder="NULL" className="rounded-sm" disabled value={ledger?.credit_account ? formatCurrency(ledger?.credit_amount) : "-"} />
                        <br />
                    </div>
                    <div className="flex my-2 mx-2">
                        <p className="mr-2">Debit Account: </p>
                        <input type="text" placeholder="-" className="rounded-sm" disabled value={ledger?.debit_account ? ledger?.debit_account.desc : '-'} />
                        <br />
                    </div>
                    <div className="flex my-2 mx-2">
                        <p className="mr-2">Debit Amount: </p>
                        <input type="text" placeholder="NULL" className="rounded-sm" disabled value={ledger?.debit_account ? formatCurrency(ledger?.debit_amount) : "-"} />
                        <br />
                    </div>
                    <div className="flex my-2 mx-2">
                        <p className="mr-2">Total Credit Balance: </p>
                        <input type="text" placeholder="-" className="rounded-sm" disabled value={ledger?.credit_account ? formatCurrency(ledger?.credit_account.balance) : '-'} />
                        <br />
                    </div>
                    <div className="flex my-2 mx-2">
                        <p className="mr-2">Total Debit Balance: </p>
                        <input type="text" placeholder="-" className="rounded-sm" disabled value={ledger?.debit_account ? formatCurrency(ledger?.debit_account.balance) : '-'} />
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

export default LedgerById