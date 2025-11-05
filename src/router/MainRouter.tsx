import AppLayout from "../AppLayout";

import AccountRouter from "./AccountRouter";
import LedgerRouter from "./LedgerRouter";

export default [
  {
    path: "/", element: <AppLayout></AppLayout>, children: [
      ...AccountRouter,
      ...LedgerRouter
    ]
  },
]