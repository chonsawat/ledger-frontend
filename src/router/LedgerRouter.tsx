import Ledger from "../pages/Ledger/Ledger";
import LedgerAdding from "../pages/Ledger/LedgerAdding";
import { action as addLedger } from "../pages/Ledger/LedgerAdding";
import LedgerById from "../pages/Ledger/LedgerById";
import { loader as fetchLedgerById } from "../pages/Ledger/LedgerById";
import { action as deleteAccountById } from "../pages/Ledger/LedgerById";
import LedgerGroup from "../pages/Ledger/LedgerGroup";
import LedgerUpdate from "../pages/Ledger/LedgerUpdate";
import { loader as fetchLedgerUpdate } from "../pages/Ledger/LedgerUpdate";

import { fetchAccounts } from "../services/apiAccounts";
import { fetchLedgers, fetchLedgersAsGroup, updateLedger } from "../services/apiLedger";
import { LedgerType } from "../store/ledgerStore";

export default [
  { path: "/ledger", element: <Ledger></Ledger>, loader: fetchLedgers },
  { path: "/ledger/groupByDate", element: <LedgerGroup></LedgerGroup>, loader: fetchLedgersAsGroup },
  { path: "/ledger/add", element: <LedgerAdding></LedgerAdding>, loader: fetchAccounts, action: (e: LedgerType) => addLedger(e) },
  { path: "/ledger/update/:theId", element: <LedgerUpdate></LedgerUpdate>, loader: fetchLedgerUpdate as any, action: updateLedger },
  { path: "/ledger/:theId", element: <LedgerById></LedgerById>, loader: fetchLedgerById as any, action: deleteAccountById },
]