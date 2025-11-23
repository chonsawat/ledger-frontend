import { createAccounts, deleteAccountById, updateAccountsById } from "../../services/apiAccounts";
import { AccountType, CreateAccountType,  } from "../../types/DefineAccountsType";
import { devDebug } from "../../utils/utils";

export async function useCreateAccounts(newAccount: AccountType): Promise<AccountType> {
  const request: CreateAccountType = {
    id: 0,
    desc: newAccount.desc || "<< Empty >>",
    original_balance: Number(newAccount.original_balance) | 0
  };

  devDebug("useCreateAccounts", () => {
    console.log(request)
  })
  return await createAccounts(request);
}

type UseDeleteT = {
  id: number
}
export async function useDeleteAccounts(deleteAccount: UseDeleteT): Promise<AccountType> {
  devDebug("useDeleteAccounts", () => {
    console.log(deleteAccount)
  })
  return await deleteAccountById(deleteAccount.id);
}

export async function useUpdateAccounts(newAccounts: AccountType): Promise<AccountType> {
  return await updateAccountsById(newAccounts);
}