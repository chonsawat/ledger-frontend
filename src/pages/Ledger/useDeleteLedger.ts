import { ActionFunctionArgs } from "react-router";
import { deleteLedger } from "../../services/apiLedger";
import { devDebug } from "../../utils/utils";

export async function useDeleteLedgerById({ params }: ActionFunctionArgs) {
  const ledger = {
    id: Number(params.theId)
  }

  devDebug("useDeleteLedgerById", () => { })

  const deletedLedger = await deleteLedger((ledger));
  console.groupEnd()
  return window.history.back();
}