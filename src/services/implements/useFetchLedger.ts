import { fetchLedgers } from "../apiLedger"

export async function useFetchLedger() {
  const data = await fetchLedgers()
  return data
}