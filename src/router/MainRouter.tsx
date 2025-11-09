import AppLayout from "../AppLayout";
import HomePage from "../pages/HomePage/HomePage";

import AccountRouter from "./AccountRouter";
import LedgerRouter from "./LedgerRouter";

export default [
  {
    path: "/", element: <AppLayout></AppLayout>, children: [
      { path: "/", element: <HomePage></HomePage>},
      ...AccountRouter,
      ...LedgerRouter
    ]
  },
]