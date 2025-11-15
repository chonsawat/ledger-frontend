import { MutationFunction, useMutation, useMutationState, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent } from "react"
import { useForm, useFormContext } from "react-hook-form"
import toast from "react-hot-toast"
import { Form, useSubmit } from "react-router"
import { useAccounts, useNewAccount } from "../../store/accountStore"
import { useCreateAccounts } from "./useAccountAPI"

function AccountAddPage() {
    const { handleSubmit, register } = useForm()
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        onSuccess: () => {
            toast.success("Accounts was added")
            queryClient.invalidateQueries({
                queryKey: ["accounts"]
            })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
    const data = useNewAccount((state) => state.newAccounts)
    const setData = useNewAccount(state => state.setNewAccounts)

    function onSubmitForm() {
        useCreateAccounts(data);
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const inputFormAttribute = {
        description: {
            ...register("description"),
            title: "Desciption",
            defaultValue: "Desciption",
            onChange: (e: ChangeEvent<HTMLInputElement>) => { onChangeHandler(e) }
        },
        originalBalance: {
            ...register("originalBalance"),
            title: "Original Balance",
            defaultValue: 0,
            onChange: (e: ChangeEvent<HTMLInputElement>) => { onChangeHandler(e) }
        }
    }

    return (
        <div>
            <h1>Account Adding</h1>
            <Form onSubmit={handleSubmit(onSubmitForm)}>
                <InputForm {...inputFormAttribute.description}></InputForm>
                <InputForm {...inputFormAttribute.originalBalance}></InputForm>
                <div className="ml-2 mt-3">
                    <input type="submit" className="px-3 py-1 bg-red-500 text-white rounded-2xl" />
                </div>
            </Form>
        </div>
    )
}

function InputForm(props: any) {
    const variants = {
        input: `
            focus:text-cyan-500 focus:animate-pulse 
            border rounded-lg
        `
    }
    return (
        <div>
            <div className="flex">
                <p className="mr-2">{props.title}: </p>
                <input type="text" {...props} className={variants.input} />
            </div>
        </div>
    )
}

const variants = {
    input: "border rounded-lg"
}
export default AccountAddPage