import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Form, Params, useNavigate, useParams } from "react-router";
import { useUpdateAccounts } from "../../services/implements/useAccountAPI";
import { useFetchAccountById } from "../../services/implements/useFetchAccountById";
import { AccountType } from "../../types/DefineAccountsType";
import Loading from "../Loading/Loading";

function AccountUpdatePage() {
    const params: Params<string> = useParams()
    const { handleSubmit, register } = useForm()
    const navigate = useNavigate();
    const [updateAccount, setUpdateAccount] = useState<AccountType>()

    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: [`updateAccount_${params.theId}`],
        queryFn: () => useFetchAccountById({ params }),
        gcTime: 1000 * 5,
        refetchOnMount: true,
    })
    const { mutate: useUpdateAccountsMutate } = useMutation({
        mutationFn: useUpdateAccounts,
        onSuccess: () => { 
            toast.success("Accounts was updated")
            queryClient.invalidateQueries({ 
                queryKey: ["accounts"] 
            }) 
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    function onSubmitForm() {
        useUpdateAccountsMutate(updateAccount as AccountType);
        navigate("/accounts")
    }

    const inputFormAttribute = {
        description: {
            ...register("desc"),
            title: "Desciption",
            defaultValue: data?.desc,
            onChange: (e: ChangeEvent<HTMLInputElement>) => { onChangeHandler(e) }
        },
        originalBalance: {
            ...register("original_balance"),
            title: "Original Balance",
            defaultValue: data?.balance,
            onChange: (e: ChangeEvent<HTMLInputElement>) => { onChangeHandler(e) }
        }
    }


    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        try {
            const newValue = e.target?.value
            setUpdateAccount({
                ...updateAccount,
                [e.target?.name]: newValue
            });
        } catch (err) {
            console.error(err);
            throw new Error("Something wrong");
        }
    }

    const variants = {
        input: "px-3 py-1 bg-lime-500 text-white rounded-2xl hover:cursor-pointer"
    }

    useEffect(() => {
        setUpdateAccount(data)
    }, [data])

    if (isLoading) return <Loading></Loading>

    return (
        <div className="mt-5 mx-5 py-5 border rounded-2xl">
            <Form onSubmit={handleSubmit(onSubmitForm)}>
                <InputForm {...inputFormAttribute.description}></InputForm>
                <InputForm {...inputFormAttribute.originalBalance}></InputForm>
                <div className="ml-5 mt-3">
                    <input type="submit" className={variants.input} value="Save" />
                </div>
            </Form>
        </div>
    )
}

function InputForm(props: { title: string }) {
    const variants = {
        input: `
            focus:animate-pulse border rounded-lg pl-1
        `
    }

    useEffect(() => {
        console.log(props);

    }, [])
    return (
        <div className="mx-5 my-2">
            <div className="flex">
                <p className="mr-2">{props.title}: </p>
                <input type="text" {...props} className={variants.input} />
            </div>
        </div>
    )
}

export default AccountUpdatePage

