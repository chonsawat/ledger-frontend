import { fetchLedgersAsGroup } from "../../services/apiLedger";
import { devDebug } from "../../utils/utils";

export async function useFetchLedgerAsGroup() {
  devDebug("useFetchLedgerAsGroup", () => { })
  const data = await fetchLedgersAsGroup();
  return data;
}
