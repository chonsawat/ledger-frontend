import Ledger from "../pages/Ledger/Ledger";
import LedgerAdding from "../pages/Ledger/LedgerAdding";
import LedgerById from "../pages/Ledger/LedgerById";
import LedgerGroup from "../pages/Ledger/LedgerGroup";
import LedgerUpdate from "../pages/Ledger/LedgerUpdate";

import { UseCreateLedgerType } from "../types/DefineLedgerType";

export default [
  { path: "/ledger", element: <Ledger></Ledger>},
  { path: "/ledger/groupByDate", element: <LedgerGroup></LedgerGroup>},
  { path: "/ledger/add", element: <LedgerAdding></LedgerAdding>},
  { path: "/ledger/update/:theId", element: <LedgerUpdate></LedgerUpdate>},
  { path: "/ledger/:theId", element: <LedgerById></LedgerById>},
]