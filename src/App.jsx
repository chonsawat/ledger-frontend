import { createBrowserRouter, RouterProvider } from "react-router"
import './App.css'
import Ledger, {loader as fetchLedgers} from './pages/Ledger/Ledger'
import LedgerAdding from './pages/Ledger/LedgerAdding'
import LedgerUpdate from "./pages/Ledger/LedgerUpdate"
import LedgerById, {loader as fetchLedgerById} from './pages/Ledger/LedgerById'
import Accounts, {loader as fetchAccounts} from './pages/Account/Account'
import AccountAdding from './pages/Account/AccountAdding'
import AccountById from './pages/Account/AccountById'
import AppLayout from "./AppLayout"

const router = createBrowserRouter([
  {path: "/", element: <AppLayout></AppLayout>, children: [
    {path: "/ledger", element: <Ledger></Ledger>, loader: fetchLedgers},
    {path: "/ledger/add", element: <LedgerAdding></LedgerAdding>},
    {path: "/ledger/update/:theId", element: <LedgerUpdate></LedgerUpdate>, loader: fetchLedgerById},
    {path: "/ledger/:theId", element: <LedgerById></LedgerById>, loader: fetchLedgerById},
    {path: "/accounts", element: <Accounts></Accounts>, loader: fetchAccounts},
    {path: "/accounts/:theId", element: <AccountById></AccountById>},
    {path: "/accounts/add", element: <AccountAdding></AccountAdding>},
  ]},

])

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
