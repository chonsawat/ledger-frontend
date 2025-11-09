import { Form, useLoaderData, useNavigate, useParams } from "react-router";
import { ChangeEvent, useEffect, useState } from "react";
import { AccountType } from "../Account/Account";
import {
  LedgerType,
  LedgerUpdateType,
  useNewLedger,
  newLedgerDetailAccountSelectedType,
} from "../../store/ledgerStore";
import { DataType, useUpdateLedger } from "./useUpdateLedger";
import { devDebug } from "../../utils/utils";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

function LedgerUpdate() {
  const [theLedger, setTheLedger] = useState<LedgerUpdateType>();
  const { ledger, accounts } = useLoaderData<{
    ledger: LedgerUpdateType;
    accounts: AccountType;
  }>();
  const params = useParams();

  useEffect(() => {
    setTheLedger(ledger);
  }, []);

  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm();

  const queryClient = useQueryClient()
  const { mutate: useUpdateLedgerMutate } = useMutation({
    mutationFn: useUpdateLedger,
    onSuccess: () => {
      toast.success("Ledger successfully updated");
      queryClient.invalidateQueries({ queryKey: ["groupOfLedger"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const newAccounts: newLedgerDetailAccountSelectedType = {
    credit_account: useNewLedger((state) => state.credit_account),
    debit_account: useNewLedger((state) => state.debit_account),
  };

  function onSubmitHandler(request: any) {
    let data: DataType = { ...theLedger, credit_account: newAccounts.credit_account, debit_account: newAccounts.debit_account, accounts: request.accounts }
    reset()
    devDebug("[LedgerUpdate] onSubmitHandler - tsx: data", () => {
      console.log(params)
      console.log(theLedger);
    })
    useUpdateLedgerMutate({ params, data })
  }

  function onChangeLedger(e: ChangeEvent<HTMLInputElement>, fieldName: string) {
    let value = e.target.value;
    if (value.split(" ")[0] === "฿") {
      value = value.split(" ")[1];
    }

    console.log(fieldName);
    setTheLedger((prev) => ({ ...prev, id: prev?.id, [fieldName]: value }));
  }

  return (
    <div className="my-5">
      <Form onSubmit={handleSubmit(onSubmitHandler)} method="POST" className="border rounded-xl ml-2 mr-4">
        <DataRow name="Date" inputName="date" value={theLedger?.date} onChangeFn={(e: ChangeEvent<HTMLInputElement>) => onChangeLedger(e, "date")}></DataRow>
        <DataRow
          name="Description"
          inputName="description"
          value={theLedger?.description}
          onChangeFn={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeLedger(e, "description")
          }
        ></DataRow>
        <AccountDropDown mode="credit" ></AccountDropDown>
        <DataRow
          name="Credit Amount"
          inputName="credit_amount"
          value={theLedger?.credit_amount}
          onChangeFn={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeLedger(e, "credit_amount")
          }
        ></DataRow>
        <AccountDropDown mode="debit"></AccountDropDown>
        <DataRow
          name="Debit Amount"
          inputName="debit_amount"
          value={theLedger?.debit_amount}
          onChangeFn={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeLedger(e, "debit_amount")
          }
        ></DataRow>
        <ButtonSubmit></ButtonSubmit>
        <div className="hidden">
          <input
            type="hidden"
            value={JSON.stringify(accounts)}
            {...register("accounts")}
          />
        </div>
      </Form>
    </div>
  );
}

type DataRowType = {
  name: string;
  value: string | number | undefined;
  onChangeFn?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputName: string;
};
function DataRow({ name, value, onChangeFn, inputName }: DataRowType) {
  return (
    <div className="flex my-2 mx-2">
      <p className="mr-2">{name}: </p>
      <input
        name={inputName}
        type="text"
        placeholder={name}
        className="rounded-sm border"
        defaultValue={value}
        onChange={onChangeFn}
      />
      <br />
    </div>
  );
}

function AccountDropDown({ mode }: { mode: string }) {
  const { accounts } = useLoaderData<{ accounts: AccountType[] }>();
  const name = mode === "credit" ? "credit_account" : "debit_account";
  const description = mode === "credit" ? "Credit Account" : "Debit Account";
  const newAccounts: newLedgerDetailAccountSelectedType = {
    credit_account: useNewLedger().credit_account,
    debit_account: useNewLedger().debit_account,
  };
  const setCreditAccount = useNewLedger().setCreditAccount;
  const setDebitAccount = useNewLedger().setDebitAccount;

  function handleAccountChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (mode === "credit") {
      setCreditAccount(Number(e.target.value));
    } else {
      setDebitAccount(Number(e.target.value));
    }
  }

  return (
    <div className={`flex my-2 mx-2`}>
      <label htmlFor={name} className="mr-2">
        {description}:{" "}
      </label>
      <select
        id={name}
        defaultValue={newAccounts[name]}
        onChange={handleAccountChange}
        className="border rounded-sm"
      >
        <option value={0}>Select an accounts</option>
        {accounts.map((account: AccountType) => (
          <option key={account.id} value={account.id}>
            {account.id} : {account.desc}
          </option>
        ))}
      </select>
    </div>
  );
}

function ButtonSubmit() {
  const navigate = useNavigate();

  return (
    <div className="mb-3 mx-3">
      <button
        className="hover:cursor-pointer hover:bg-orange-400 rounded-xl bg-orange-500 text-white px-5 py-1"
        type="submit"
      >
        Update
      </button>
      <a
        className="hover:cursor-pointer hover:bg-red-700 rounded-xl bg-red-500 text-white px-5 py-1.25 ml-2"
        onClick={() => navigate(-1)}
      >
        Back
      </a>
    </div>
  );
}


export default LedgerUpdate;
