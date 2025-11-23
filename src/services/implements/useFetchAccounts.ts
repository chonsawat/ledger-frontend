import { devDebug } from "../../utils/utils";
import { fetchAccounts } from "../apiAccounts";

export async function usefetchAccounts() {
  const data = await fetchAccounts()
  devDebug("usefetchAccounts", function () {
    console.log(data);
  })
  return data
}
