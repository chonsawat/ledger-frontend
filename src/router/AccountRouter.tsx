
import { fetchAccountById, fetchAccounts } from "../services/apiAccounts";

import Accounts from "../pages/Account/Account";
import AccountAddPage from "../pages/Account/AccountAdding";
import AccountById from "../pages/Account/AccountById";

export default [
  { path: "/accounts", element: <Accounts></Accounts>, loader: fetchAccounts },
  { path: "/accounts/:theId", element: <AccountById></AccountById>, loader: fetchAccountById as any },
  { path: "/accounts/add", element: <AccountAddPage></AccountAddPage> },
]