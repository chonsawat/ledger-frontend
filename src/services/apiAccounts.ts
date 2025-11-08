import { AccountType } from "../pages/Account/Account";
import { devDebug } from "../utils/utils";

const API_URL = import.meta.env.VITE_API_URL

export async function fetchAccounts(): Promise<AccountType[]> {
  const res = await fetch(`${API_URL}/api/accounts`);

  if (!res.ok) throw Error("Fail to fetch data")

  const data = await res.json();
  devDebug('fetchAccounts - API', () => {
    console.log(data);
  })
  return data
}

export async function fetchAccountById(theId: number): Promise<AccountType> {
  devDebug("fetchAccountById - API", function () {
    console.log(theId);
  })

  const res = await fetch(`${API_URL}/api/account/${theId}`)

  if (!res.ok) throw Error("Fail to fetch data")

  const data = await res.json();
  return data
}