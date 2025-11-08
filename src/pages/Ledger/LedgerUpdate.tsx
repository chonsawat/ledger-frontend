import { Form, useLoaderData, useNavigate } from "react-router";
import { ChangeEvent, useEffect, useState } from "react";
import { AccountType } from "../Account/Account";
import {
  LedgerType,
  LedgerUpdateType,
  useNewLedger,
  newLedgerDetailAccountSelectedType,
} from "../../store/ledgerStore";

function LedgerUpdate() {
  const [theLedger, setTheLedger] = useState<LedgerUpdateType>();
  const { ledger, accounts } = useLoaderData<{
    ledger: LedgerType;
    accounts: AccountType;
  }>();

  useEffect(() => {
    setTheLedger(ledger);
  }, []);

  function onChangeLedger(e: ChangeEvent<HTMLInputElement>, fieldName: string) {
    let value = e.target.value;
    if (value.split(" ")[0] === "฿") {
      value = value.split(" ")[1];
    }

    setTheLedger((prev) => ({ ...prev, id: prev?.id, [fieldName]: value }));
  }

  return (
    <div className="my-5">
      <Form action="" method="POST" className="border rounded-xl ml-2 mr-4">
        <DataRow name="Date" inputName="date" value={theLedger?.date}></DataRow>
        <DataRow
          name="Description"
          inputName="description"
          value={theLedger?.description}
          onChangeFn={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeLedger(e, "description")
          }
        ></DataRow>
        <AccountDropDown mode="credit"></AccountDropDown>
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
            name="accounts"
            value={JSON.stringify(accounts)}
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
        name={name}
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
