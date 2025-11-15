import { create } from "zustand";
import { AccountType, UseNewAccountType } from "../pages/Account/DefineAccountsType";

export const useNewAccount = create<
  { newAccounts: UseNewAccountType }
  & { setNewAccounts: (x: UseNewAccountType) => void }
>((set, get) => ({
  newAccounts: {
    id: 0,
    description: "",
    originalBalance: 0,
  },
  setNewAccounts: (newValue: UseNewAccountType) => set({
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