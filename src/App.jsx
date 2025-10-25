import Accounts from './pages/Account/Account'
import './App.css'
import Ledger from './pages/Ledger/Ledger'
import { createBrowserRouter, RouterProvider } from "react-router"

const router = createBrowserRouter([
  {path: "/ledger", element: <Ledger></Ledger>},
  {path: "/accounts", element: <Accounts></Accounts>},
])

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
