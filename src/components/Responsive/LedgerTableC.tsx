import React from 'react';
import Loading from '../../pages/Loading/Loading';
import { LedgerType } from '../../types/DefineLedgerType';
import { formatCurrency } from '../../utils/utils';

type LedgerTableCT = {
  data: LedgerType[],
  isLoading?: boolean,
  onClickDateHandler?: () => {},
  onClickUpdateHandler?: () => {},
}
function LedgerTableC({ data, isLoading }: LedgerTableCT) {
  const ledgerDataMockup: LedgerType[] = data;
  const totalMockup: TotalBalance = {
    totalCredit: ledgerDataMockup !== undefined ? ledgerDataMockup.filter(item => item.credit_amount > 0).reduce((total, { credit_amount }) => total + credit_amount, 0) : 0,
    totalDebit: ledgerDataMockup !== undefined ? ledgerDataMockup.filter(item => item.debit_amount > 0).reduce((total, { debit_amount }) => total + debit_amount, 0) : 0
  }

  if (isLoading) return <Loading></Loading>;

  return (
    <>
      <TableContainer>
        <React.Fragment>
          <table className="text-center min-w-fit shadow-md w-full h-full">
            <TableHeader></TableHeader>
            <TableBody data={ledgerDataMockup}></TableBody>
          </table>
          <Summary data={totalMockup}></Summary>
          <div className="mb-5"></div>
        </React.Fragment>
      </TableContainer>
    </>
  );
}

type TotalBalance = { totalCredit: number; totalDebit: number };
function Summary({ data }: { data?: TotalBalance }) {
  if (data === undefined) return <div></div>
  return (
    <div className="flex my-3 w-full justify-end">
      <div className="flex border rounded-2xl px-3 py-2 border-gray-300 ">
        <p className="mx-5">Total Credit: {formatCurrency(data.totalCredit)}</p>
        <p className="mx-5">Total Debit: {formatCurrency(data.totalDebit)}</p>
      </div>
    </div>
  );
}

function TableContainer({ children }: { children: React.ReactNode }) {
  return <div className=''>
    <div className="table-ledger-content my-5 mx-5">
      <div className="flex flex-col items-center">
        {children}
      </div>
    </div>
  </div>
}

function TableHeader() {
  const variants = {
    date: `
      border-spacing-5 rounded-2xl py-1 px-2 bg-slate-800 text-white
      text-[10px] w-64
      sm:w-32
      md:text-[12px] md:py-3
    `,
    detail: `
      border-spacing-5 rounded-2xl py-1 px-2 bg-slate-800 text-white
      text-[10px] w-[20%]
      md:text-[12px] md:w-[30%] md:py-3
    `,
    creditAcc: `
      border-spacing-5 rounded-2xl py-1 px-2 bg-slate-800 text-white
      text-[10px] 
      md:text-[12px] md:py-3
    `,
    creditAmt: `
      border-spacing-5 rounded-2xl py-1 px-2 bg-slate-800 text-white
      text-[10px] 
      md:text-[12px] md:py-3
    `,
    debitAcc: `
      border-spacing-5 rounded-2xl py-1 px-2 bg-slate-800 text-white
      text-[10px] 
      md:text-[12px] md:py-3
    `,
    debitAmt: `
      border-spacing-5 rounded-2xl py-1 px-2 bg-slate-800 text-white
      text-[10px] 
      md:text-[12px] md:py-3
    `,
    update: `
      border-spacing-5 rounded-2xl py-1 px-2 bg-slate-800 text-white 
      text-[10px]
      md:text-[12px] md:py-3
    `,
  }
  return (
    <thead>
      <tr>
        <th className={variants.date}> Date </th>
        <th className={variants.detail}> Detail </th>
        <th className={variants.creditAcc}> Credit Account </th>
        <th className={variants.creditAmt}> Credit Amount </th>
        <th className={variants.debitAcc}> Debit Account </th>
        <th className={variants.debitAmt}> Debit Amount </th>
        <th className={variants.update}> Update </th>
      </tr>
    </thead>
  );
}

function TableBody({ data }: { data: LedgerType[] }) {
  return (
    <tbody>
      {data?.map((ledger) => {
        return <FoundRow key={ledger.id} ledger={ledger}></FoundRow>;
      })}
    </tbody>
  );
}

function FoundRow({ ledger }: { ledger: LedgerType }) {

  function formatText(text: string, maxLength: number = 10) {
    try {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "..."
      }
    } catch (e) {
      return "<< Cannot format >>"
    }
    return text
  }

  return (
    <tr
      key={ledger.id}
      className="hover:text-bold hover:text-black hover:bg-gray-200"
    >
      <td
        className="p-4 border-b border-gray-200 hover:cursor-pointer"
        onClick={() => {
          // onClickDateHandler(ledger.id!);
        }}
      >
        {ledger.date}
      </td>
      <td className="p-4 border-b border-gray-200">{formatText(ledger.description, 20)}</td>
      <td className="p-4 border-b border-gray-200">
        {ledger.credit_account ? formatText(ledger.credit_account.desc) : ""}
      </td>
      <td className="p-4 border-b border-gray-200 text-end">
        {formatCurrency(ledger.credit_amount)}
      </td>
      <td className="p-4 border-b border-gray-200">
        {ledger.debit_account ? formatText(ledger.debit_account.desc) : ""}
      </td>
      <td className="p-4 border-b border-gray-200 text-end">
        {formatCurrency(ledger.debit_amount)}
      </td>
      <td className="p-2 border-b border-gray-200">
        <a
          className="hover:bg-orange-500 hover:cursor-pointer bg-gray-200 text-white rounded-xl p-1.5 sm:p-2"
          onClick={() => {
            // onClickUpdateHandler(ledger.id!);
          }}
        >
          Update
        </a>
      </td>
    </tr>
  );
}

export default LedgerTableC