import { Params } from "react-router";
import { devDebug } from "../../utils/utils";
import { deleteLedger } from "../apiLedger";

export async function useDeleteLedgerById(params: Params<string>) {
  const ledger = {
    id: Number(params.theId)
  }

  devDebug("useDeleteLedgerById", () => { })

  const deletedLedger = await deleteLedger((ledger));
  console.groupEnd()
  return window.history.back();
}