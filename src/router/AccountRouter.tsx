import Accounts from "../pages/Account/Account";
import AccountAddPage from "../pages/Account/AccountAdding";
import AccountById from "../pages/Account/AccountById";

import { useFetchAccountById } from "../pages/Account/useFetchAccountById";
import { usefetchAccounts } from "../pages/Account/useFetchAccounts";

export default [
  { path: "/accounts", element: <Accounts></Accounts>, loader: usefetchAccounts },
  { path: "/accounts/:theId", element: <AccountById></AccountById>, loader: useFetchAccountById },
  { path: "/accounts/add", element: <AccountAddPage></AccountAddPage> },
]