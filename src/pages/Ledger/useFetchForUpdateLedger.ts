import { fetchAccounts } from "../../services/apiAccounts";
import { fetchLedgerById } from "../../services/apiLedger";
import { devDebug } from "../../utils/utils";

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