import { createBrowserRouter, RouterProvider } from "react-router"
import { Provider as JotaiProvider } from "jotai"
import './App.css'

import MainRouter from "./router/MainRouter"

const router = createBrowserRouter(MainRouter)

function App() {
  return (
    <JotaiProvider>
      <RouterProvider router={router}></RouterProvider>
    </JotaiProvider>
  )
}

export default App
