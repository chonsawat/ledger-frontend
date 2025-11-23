import Accounts from "../pages/Account/Account";
import AccountAddPage from "../pages/Account/AccountAdding";
import AccountById from "../pages/Account/AccountById";
import AccountUpdatePage from "../pages/Account/AccountUpdate";
import { useFetchAccountById } from "../services/implements/useFetchAccountById";

export default [
  { path: "/accounts", element: <Accounts></Accounts>, },
  { path: "/accounts/:theId", element: <AccountById></AccountById>, loader: useFetchAccountById },
  { path: "/accounts/add", element: <AccountAddPage></AccountAddPage> },
  { path: "/accounts/update/:theId", element: <AccountUpdatePage></AccountUpdatePage> },
]