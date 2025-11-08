import { fetchLedgers } from "../../services/apiLedger"

export async function useFetchLedger() {
  const data = await fetchLedgers()
  return data
}