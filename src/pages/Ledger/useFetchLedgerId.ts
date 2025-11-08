import { fetchLedgerById } from "../../services/apiLedger";
import { devDebug } from "../../utils/utils";

export async function useFetchLedgerById({ params: { theId } }: { params: { theId: number } }) {
  devDebug("useFetchLedgerById", () => { })
  const data = await fetchLedgerById(theId);
  return data
}
