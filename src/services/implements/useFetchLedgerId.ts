import { devDebug } from "../../utils/utils";
import { fetchLedgerById } from "../apiLedger";

export async function useFetchLedgerById({ params: { theId } }: { params: { theId: number } }) {
  devDebug("useFetchLedgerById", () => { })
  const data = await fetchLedgerById(theId);
  return data
}
