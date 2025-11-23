import { devDebug } from "../../utils/utils";
import { fetchLedgersAsGroup } from "../apiLedger";

export async function useFetchLedgerAsGroup() {
  devDebug("useFetchLedgerAsGroup", () => { })
  const data = await fetchLedgersAsGroup();
  return data;
}
