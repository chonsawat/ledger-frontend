import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Form, useNavigate } from "react-router"
import { useCreateAccounts } from "../../services/implements/useAccountAPI"
import { useNewAccount } from "../../store/accountStore"

function AccountAddPage() {
    const { handleSubmit, register } = useForm()
    const queryClient = useQueryClient()
    const { mutate: useCreateAccountsMutate, } = useMutation({
        mutationFn: useCreateAccounts,
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
    const navigate = useNavigate()
    const data = useNewAccount((state) => state.newAccounts)
    const setData = useNewAccount(state => state.setNewAccounts)

    function onSubmitForm() {
        useCreateAccountsMutate(data);
        navigate("/accounts")
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const inputFormAttribute = {
        description: {
            ...register("desc"),
            title: "Desciption",
            defaultValue: data.desc,
            onChange: (e: ChangeEvent<HTMLInputElement>) => { onChangeHandler(e) }
        },
        originalBalance: {
            ...register("original_balance"),
            title: "Original Balance",
            defaultValue: data.original_balance,
            onChange: (e: ChangeEvent<HTMLInputElement>) => { onChangeHandler(e) }
        }
    }

    const variants = {
        input: "px-3 py-1 bg-lime-500 text-white rounded-2xl hover:cursor-pointer"
    }

    useEffect(() => {
        setData({
            ...data,
            original_balance: 0,
            desc: "Description Draft"
        })
    }, [])

    return (
        <div className="mt-5 mx-2">
            <Form onSubmit={handleSubmit(onSubmitForm)}>
                <InputForm {...inputFormAttribute.description}></InputForm>
                <InputForm {...inputFormAttribute.originalBalance}></InputForm>
                <div className="ml-2 mt-3">
                    <input type="submit" className={variants.input} value="Add" />
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
        // console.log(props);
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

export default AccountAddPage