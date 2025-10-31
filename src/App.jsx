import { createBrowserRouter, RouterProvider } from "react-router"
import './App.css'
import Ledger, {loader as fetchLedgers} from './pages/Ledger/Ledger'
// import LedgerGroup, {loader as fetchLedgers} from './pages/Ledger/LedgerGroup'
import LedgerAdding, {
  action as addLedger} from './pages/Ledger/LedgerAdding'
import LedgerUpdate, {
  loader as fetchLedgerUpdate, 
  action as updateLedger} from "./pages/Ledger/LedgerUpdate"
import LedgerById, {
  loader as fetchLedgerById, 
  action as deleteAccountById } from './pages/Ledger/LedgerById'
import Accounts, {
  loader as fetchAccounts} from './pages/Account/Account'
import AccountAdding from './pages/Account/AccountAdding'
import AccountById, {
  loader as fetchAccountById } from './pages/Account/AccountById'
import AppLayout from "./AppLayout"

const router = createBrowserRouter([
  {path: "/", element: <AppLayout></AppLayout>, children: [
    {path: "/ledger", element: <Ledger></Ledger>, loader: fetchLedgers},
    {path: "/ledger/add", element: <LedgerAdding></LedgerAdding>, loader: fetchAccounts, action: addLedger},
    {path: "/ledger/update/:theId", element: <LedgerUpdate></LedgerUpdate>, loader: fetchLedgerUpdate, action: updateLedger },
    {path: "/ledger/:theId", element: <LedgerById></LedgerById>, loader: fetchLedgerById, action: deleteAccountById },
    {path: "/accounts", element: <Accounts></Accounts>, loader: fetchAccounts},
    {path: "/accounts/:theId", element: <AccountById></AccountById>, loader: fetchAccountById},
    {path: "/accounts/add", element: <AccountAdding></AccountAdding>},
  ]},

])

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
