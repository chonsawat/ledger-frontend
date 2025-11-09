import { Params } from "react-router";
import { deleteLedger } from "../../services/apiLedger";
import { devDebug } from "../../utils/utils";

export async function useDeleteLedgerById(params: Params<string>) {
  const ledger = {
    id: Number(params.theId)
  }

  devDebug("useDeleteLedgerById", () => { })

  const deletedLedger = await deleteLedger((ledger));
  console.groupEnd()
  return window.history.back();
}