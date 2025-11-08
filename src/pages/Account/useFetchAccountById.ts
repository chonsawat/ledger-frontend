import { Params } from "react-router";
import { fetchAccountById } from "../../services/apiAccounts";
import { devDebug } from "../../utils/utils";

export async function useFetchAccountById({ params }: { params: Params<string> }) {
  const data = await fetchAccountById(Number(params.theId));
  devDebug("useFetchAccountById", function () {
    console.log(data);
  })
  return data
}