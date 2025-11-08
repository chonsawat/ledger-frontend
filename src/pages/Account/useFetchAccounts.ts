import { fetchAccounts } from "../../services/apiAccounts"
import { devDebug } from "../../utils/utils"

export async function usefetchAccounts() {
  const data = await fetchAccounts()
  devDebug("usefetchAccounts", function () {
    console.log(data);
  })
  return data
}
