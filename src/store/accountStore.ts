import { create } from "zustand";

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