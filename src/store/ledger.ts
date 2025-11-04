import { atom } from "jotai"

export type LedgerType = {
  id: number | undefined,
  description: string
  date: string,
  credit_account: {
    id: number,
    desc: string
  }
  credit_amount: number
  debit_account: {
    id: number,
    desc: string
  }
  debit_amount: number
}

export const newLedgerDetail = atom({})
export const newLedgerDetailAccountSelected = atom({
  creditAccount: 0,
  debitAccount: 0,
}
)
export const searchLedgerDescription = atom<string>("");