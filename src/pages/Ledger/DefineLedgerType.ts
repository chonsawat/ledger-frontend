import { LedgerType } from "../../store/ledgerStore";

export type GroupOfLedgerType = { [date: string]: LedgerType[] };
export type LedgerGroupByDateType = {
  date: string,
  data: LedgerType[]
}
export type UseCreateLedgerType = {
  accounts: string,
  id: number,
  date: string,
  description: string,
  credit_account: number,
  debit_account: number,
  credit_amount: number,
  debit_amount: number
}