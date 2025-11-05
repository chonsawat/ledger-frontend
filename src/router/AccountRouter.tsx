import Accounts from "../pages/Account/Account";
import { loader as fetchAccounts } from "../pages/Account/Account";
import AccountAddPage from "../pages/Account/AccountAdding";
import AccountById from "../pages/Account/AccountById";
import { loader as fetchAccountById } from "../pages/Account/AccountById";

export default [
  { path: "/accounts", element: <Accounts></Accounts>, loader: fetchAccounts },
  { path: "/accounts/:theId", element: <AccountById></AccountById>, loader: fetchAccountById },
  { path: "/accounts/add", element: <AccountAddPage></AccountAddPage> },
]