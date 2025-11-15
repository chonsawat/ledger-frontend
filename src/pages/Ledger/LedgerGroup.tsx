import { useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { formatCurrency, useShortcut } from "../../utils/utils";
import { LedgerType, useSearch } from "../../store/ledgerStore";
import { useFetchLedgerAsGroup } from "./useFetchLedgersAsGroup";
import Loading from "../Loading/Loading";
import { LedgerGroupByDateType } from "./DefineLedgerType";


function LedgerGroup() {
  const searchLedger = useSearch((state) => state.searchText);

  const { data: ledgerGroupByDate, isLoading } = useQuery<LedgerGroupByDateType[]>({
    queryKey: ["groupOfLedger"],
    queryFn: useFetchLedgerAsGroup,
  });

  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["groupOfLedger"] });

  if (isLoading) return <Loading></Loading>;

  return (
    <div>
      <div className="table-ledger-content my-5 mx-5">
        <SearchBar></SearchBar>
        <div className="flex flex-col items-center">
          {ledgerGroupByDate?.map(
            ({ date, data }: LedgerGroupByDateType) => {
              const filteredLedger: LedgerType[] = data.filter(
                (x) =>
                  x.description
                    ? x.description
                      .toLowerCase()
                      .includes(searchLedger.toLowerCase())
                    : null,
              );
              const totalSummary: TotalBalance = {
                totalCredit: filteredLedger.reduce(
                  (accumulate, current) =>
                    (accumulate += current.credit_amount),
                  0,
                ),
                totalDebit: filteredLedger.reduce(
                  (accumulate, current) =>
                    (accumulate += current.debit_amount),
                  0,
                ),
              };

              if (filteredLedger.length > 0) {
                return (
                  <div key={date} className="w-full">
                    <table className="text-center min-w-max shadow-md w-full">
                      <TableHeader></TableHeader>
                      <TableBody
                        date={date}
                        data={filteredLedger}
                      ></TableBody>
                    </table>
                    <Summary data={totalSummary}></Summary>
                    <div className="mb-10"></div>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}

type TotalBalance = { totalCredit: number; totalDebit: number };
function Summary({ data }: { data: TotalBalance }) {
  return (
    <div className="flex my-3 w-full justify-end">
      <div className="flex border rounded-2xl px-3 py-2 border-gray-300 ">
        <p className="mx-5">Total Credit: {formatCurrency(data.totalCredit)}</p>
        <p className="mx-5">Total Debit: {formatCurrency(data.totalDebit)}</p>
      </div>
    </div>
  );
}

function TableHeader() {
  return (
    <thead>
      <tr>
        <th className="border-spacing-5 rounded-2xl py-3 px-2 bg-slate-800 text-white">
          Date
        </th>
        <th className="border-spacing-5 rounded-2xl py-3 px-2 bg-slate-800 text-white w-[50%]">
          Detail
        </th>
        <th className="border-spacing-5 rounded-2xl py-3 px-2 bg-slate-800 text-white">
          Credit Account
        </th>
        <th className="border-spacing-5 rounded-2xl py-3 px-2 bg-slate-800 text-white">
          Credit Amount
        </th>
        <th className="border-spacing-5 rounded-2xl py-3 px-2 bg-slate-800 text-white">
          Debit Account
        </th>
        <th className="border-spacing-5 rounded-2xl py-3 px-2 bg-slate-800 text-white">
          Debit Amount
        </th>
        <th className="border-spacing-5 rounded-2xl py-3 px-2 bg-slate-800 text-white w-4">
          Update
        </th>
      </tr>
    </thead>
  );
}

function TableBody({ data }: { date: string; data: LedgerType[] }) {
  return (
    <tbody>
      {data?.map((ledger) => {
        return <FoundRow key={ledger.id} ledger={ledger}></FoundRow>;
      })}
    </tbody>
  );
}

function AddButton() {
  const navigate = useNavigate();

  function onClickAddHandler() {
    navigate(`/ledger/add`);
  }

  useShortcut("A", () => {
    onClickAddHandler();
  });

  return (
    <div className="mx-5 add-ledger-content my-5 sm:w-[20%] md:w-[20%] md:mr-0">
      <a
        className="hover:cursor-pointer border rounded-xl p-3 bg-gray-300 hover:bg-lime-500 text-bold text-white animate-bounce"
        onClick={onClickAddHandler}
      >
        Add Ledger
      </a>
    </div>
  );
}

function SearchBar() {
  const setSearchLedger = useSearch((state) => state.setSearchText);

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchLedger(e.target.value);
  }

  return (
    <div className="flex">
      <AddButton></AddButton>
      <input
        type="text"
        placeholder="Search Desc"
        className="w-420 mt-2.5 mb-5 py-2 px-3 border rounded-xl border-gray-500 sm:w-[75%] md:w-[90%] lg:w-full"
        onChange={(e) => onChangeHandler(e)}
      />
    </div>
  );
}

function FoundRow({ ledger }: { ledger: LedgerType }) {
  const navigate = useNavigate();

  function onClickDateHandler(theId: number) {
    navigate(`/ledger/${theId}`);
  }

  function onClickUpdateHandler(theId: number) {
    navigate(`/ledger/update/${theId}`);
  }

  return (
    <tr
      key={ledger.id}
      className="hover:text-bold hover:text-black hover:bg-gray-200"
    >
      <td
        className="p-4 border-b border-gray-200 hover:cursor-pointer"
        onClick={() => {
          onClickDateHandler(ledger.id!);
        }}
      >
        {ledger.date}
      </td>
      <td className="p-4 border-b border-gray-200">{ledger.description}</td>
      <td className="p-4 border-b border-gray-200">
        {ledger.credit_account ? ledger.credit_account.desc : ""}
      </td>
      <td className="p-4 border-b border-gray-200 text-end">
        {formatCurrency(ledger.credit_amount)}
      </td>
      <td className="p-4 border-b border-gray-200">
        {ledger.debit_account ? ledger.debit_account.desc : ""}
      </td>
      <td className="p-4 border-b border-gray-200 text-end">
        {formatCurrency(ledger.debit_amount)}
      </td>
      <td className="p-4 border-b border-gray-200">
        <a
          className="hover:bg-orange-500 hover:cursor-pointer bg-gray-200 text-white p-3 rounded-xl"
          onClick={() => {
            onClickUpdateHandler(ledger.id!);
          }}
        >
          Update
        </a>
      </td>
    </tr>
  );
}

function NotFoundRow() {
  return (
    <tr className="hover:text-bold hover:text-black hover:bg-gray-200">
      <td className="p-4 border-b border-gray-200 hover:cursor-pointer">-</td>
      <td className="p-4 border-b border-gray-200">-</td>
      <td className="p-4 border-b border-gray-200">-</td>
      <td className="p-4 border-b border-gray-200 text-end">-</td>
      <td className="p-4 border-b border-gray-200">-</td>
      <td className="p-4 border-b border-gray-200 text-end">-</td>
      <td className="p-4 border-b border-gray-200">
        <a className="bg-gray-200 text-white p-3 rounded-xl cursor-not-allowed opacity-50">
          Update
        </a>
      </td>
    </tr>
  );
}

export default LedgerGroup;