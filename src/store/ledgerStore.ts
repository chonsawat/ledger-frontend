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

export type LedgerUpdateType = {
  id?: number,
  description?: string
  date?: string,
  credit_account?: {
    id?: number,
    desc?: string
  }
  credit_amount?: number
  debit_account?: {
    id?: number,
    desc?: string
  }
  debit_amount?: number
}

export const newLedgerDetail = atom({})
export type newLedgerDetailAccountSelectedType = {
  credit_account: number, debit_account: number
}
export const newLedgerDetailAccountSelected = atom<newLedgerDetailAccountSelectedType>({
  credit_account: 0,
  debit_account: 0,
})
export const newSelect = atom((get) => {
  return newLedgerDetailAccountSelected
},
)
export const searchLedgerDescription = atom<string>("");