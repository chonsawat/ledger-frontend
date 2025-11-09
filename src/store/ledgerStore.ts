import { create, StoreApi, UseBoundStore } from 'zustand'

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
  credit_account?: number
  credit_amount?: number
  debit_account?: number
  debit_amount?: number
}

export type newLedgerDetailAccountSelectedType = {
  credit_account: number, debit_account: number
}
export type newLedgerDetailAccountSelectedTypeStore = newLedgerDetailAccountSelectedType & {
  setCreditAccount: (newValue: number) => void,
  setDebitAccount: (newValue: number) => void
}
export const useNewLedger = create<newLedgerDetailAccountSelectedTypeStore>((set) => ({
  credit_account: 0,
  debit_account: 0,
  setCreditAccount: (newValue: number) => set({ credit_account: newValue }),
  setDebitAccount: (newValue: number) => set({ debit_account: newValue })
}))

export type UseSearchType = {
  searchText: string,
  setSearchText: (text: string) => void
}
export const useSearch = create<UseSearchType>((set) => ({
  searchText: "",
  setSearchText: (newText: string) => set({ searchText: newText })
}))
