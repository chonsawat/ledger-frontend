import { createAccounts, deleteAccountById, updateAccountsById } from "../../services/apiAccounts";
import { devDebug } from "../../utils/utils";
import { AccountType, CreateAccountType, UseNewAccountType } from "./DefineAccountsType";

export async function useCreateAccounts(newAccount: UseNewAccountType): Promise<UseNewAccountType> {
  const request: CreateAccountType = {
    id: 0,
    desc: newAccount.description,
    original_balance: Number(newAccount.originalBalance) | 0
  };

  devDebug("useCreateAccounts",() => {
    console.log(request)
  })
  return await createAccounts(request);
}

export async function useDeleteAccounts(deleteAccount: AccountType): Promise<AccountType> {
  return await deleteAccountById(deleteAccount.id);
}

export async function useUpdateAccounts(newAccounts: AccountType): Promise<AccountType> {
  return await updateAccountsById(newAccounts);
}