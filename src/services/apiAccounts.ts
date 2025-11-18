import { AccountType, CreateAccountType, UseNewAccountType } from "../pages/Account/DefineAccountsType";
import { devDebug } from "../utils/utils";
import ky from "ky";

const API_URL = import.meta.env.VITE_API_URL

export async function fetchAccounts(): Promise<AccountType[]> {
  const res = await ky.get(`${API_URL}/api/accounts`);
  const data = res.json<AccountType[]>();

  devDebug('fetchAccounts - API', () => {
    console.log(data);
  })
  return data
}

export async function fetchAccountById(theId: number): Promise<AccountType> {
  devDebug("fetchAccountById - API", function () {
    console.log(theId);
  })

  const res = await ky.get(`${API_URL}/api/account/${theId}`)
  const data = await res.json<AccountType>();
  return data
}

export async function deleteAccountById(theId: number): Promise<AccountType> {
  devDebug("deleteAccountById", () => {
    console.log("theId: " + theId)
  })

  const res = await ky.delete(`${API_URL}/api/accounts`, { json: { id: theId } } as Object)
  return res.json<AccountType>()
}

export async function updateAccountsById(newAccounts: AccountType) {
  devDebug("deleteAccountById", () => {
    console.log(newAccounts)
  })

  const res = ky.put(`${API_URL}/api/accounts`, { json: newAccounts } as Object)
  return res.json<AccountType>()
}

export async function createAccounts(newAccount: CreateAccountType): Promise<UseNewAccountType> {
  devDebug("API - createAccounts", () => {
    console.log(newAccount);
    console.log(document);
  })
  const res = await ky.post<CreateAccountType>(`${API_URL}/api/accounts`, {
    json: {
      ...newAccount
    }
  } as Object)
  return res.json<UseNewAccountType>()
}
