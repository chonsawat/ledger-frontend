import Ledger from "../pages/Ledger/Ledger";
import LedgerAdding from "../pages/Ledger/LedgerAdding";
import LedgerById from "../pages/Ledger/LedgerById";
import LedgerGroup from "../pages/Ledger/LedgerGroup";
import LedgerUpdate from "../pages/Ledger/LedgerUpdate";

import { useCreateLedger } from "../pages/Ledger/useCreateLedger";
import { useDeleteLedgerById } from "../pages/Ledger/useDeleteLedger";
import { useFetchLedgerById } from "../pages/Ledger/useFetchLedgerId";
import { usefetchAccounts } from "../pages/Account/useFetchAccounts";
import { useFetchLedgerAsGroup } from "../pages/Ledger/useFetchLedgersAsGroup";
import { useUpdateLedger } from "../pages/Ledger/useUpdateLedger";
import { useFetchLedger } from "../pages/Ledger/useFetchLedger";
import { useFetchForUpdateLedger } from "../pages/Ledger/useFetchForUpdateLedger";

import { LedgerType } from "../store/ledgerStore";

export default [
  { path: "/ledger", element: <Ledger></Ledger>, loader: useFetchLedger },
  { path: "/ledger/groupByDate", element: <LedgerGroup></LedgerGroup>, loader: useFetchLedgerAsGroup },
  { path: "/ledger/add", element: <LedgerAdding></LedgerAdding>, loader: usefetchAccounts, action: (e: LedgerType) => useCreateLedger(e) },
  { path: "/ledger/update/:theId", element: <LedgerUpdate></LedgerUpdate>, loader: useFetchForUpdateLedger as any, action: useUpdateLedger },
  { path: "/ledger/:theId", element: <LedgerById></LedgerById>, loader: useFetchLedgerById as any, action: useDeleteLedgerById },
]