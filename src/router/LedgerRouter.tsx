import LedgerAdding from "../pages/Ledger/LedgerAdding";
import LedgerById from "../pages/Ledger/LedgerById";
import LedgerGroup from "../pages/Ledger/LedgerGroup";
import LedgerUpdate from "../pages/Ledger/LedgerUpdate";
import { usefetchAccounts } from "../services/implements/useFetchAccounts";
import { useFetchForUpdateLedger } from "../services/implements/useFetchForUpdateLedger";
import { useFetchLedgerById } from "../services/implements/useFetchLedgerId";


export default [
  // { path: "/ledger", element: <Ledger></Ledger>},
  { path: "/ledger/groupByDate", element: <LedgerGroup></LedgerGroup>},
  { path: "/ledger/add", element: <LedgerAdding></LedgerAdding>, loader: usefetchAccounts},
  { path: "/ledger/update/:theId", element: <LedgerUpdate></LedgerUpdate>, loader: useFetchForUpdateLedger},
  { path: "/ledger/:theId", element: <LedgerById></LedgerById>, loader: useFetchLedgerById},
]