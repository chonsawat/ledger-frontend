import { create } from "zustand";
import Accounts, { AccountType } from "../pages/Account/Account";

type UseNewAccount = {
  id?: number,
  description: string,
  originalBalance: number
}
export const useNewAccount = create<UseNewAccount>((set) => ({
  id: undefined,
  originalBalance: 0,
  description: "",
  setId: (newValue: number) => set({ id: newValue }),
  setdescription: (newValue: string) => set({ description: newValue }),
  setOriginalBalnce: (newValue: number) => set({ originalBalance: newValue }),
}))

export const useAccounts = create<{ accounts: AccountType[], setAccounts: (e: AccountType[]) => void }>((set) => ({
  accounts: [],
  setAccounts: (newValue: AccountType[]) => set({ accounts: newValue })
}))