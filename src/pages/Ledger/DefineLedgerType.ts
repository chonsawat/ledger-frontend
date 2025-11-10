import { LedgerType } from "../../store/ledgerStore";

export type GroupOfLedgerType = { [date: string]: LedgerType[] };
export type LedgerGroupByDateType = {
  date: string,
  data: LedgerType[]
}