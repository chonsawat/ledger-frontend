import { devDebug } from "../../utils/utils";
import { fetchAccounts } from "../apiAccounts";
import { fetchLedgerById } from "../apiLedger";

export async function useFetchForUpdateLedger({
  params: { theId },
}: {
  params: { theId: number };
}) {
  devDebug("loader() in LedgerUpdate", function () {
    console.log(theId);
  });
  const ledgerFetched = await fetchLedgerById(theId);
  const accountFetched = await fetchAccounts();
  return {
    ledger: ledgerFetched,
    accounts: accountFetched,
  };
}