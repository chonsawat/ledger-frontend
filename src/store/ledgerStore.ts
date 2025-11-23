import { create, StoreApi, UseBoundStore } from 'zustand'
import { newLedgerDetailAccountSelectedTypeStore } from '../types/DefineLedgerType'

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
