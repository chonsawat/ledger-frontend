import { create } from "zustand";
import { AccountType } from "../types/DefineAccountsType";

export const useNewAccount = create<
  { newAccounts: AccountType }
  & { setNewAccounts: (x: AccountType) => void }
>((set, get) => ({
  newAccounts: {
    id: 0,
    desc: "",
    original_balance: 0,
  },
  setNewAccounts: (newValue: AccountType) => set({
    newAccounts: {
      ...get().newAccounts,
      ...newValue
    }
  }),
}))

export const useAccounts = create<{ accounts: AccountType[], setAccounts: (e: AccountType[]) => void }>((set) => ({
  accounts: [],
  setAccounts: (newValue: AccountType[]) => set({ accounts: newValue })
}))