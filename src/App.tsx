import { createBrowserRouter, RouterProvider } from "react-router"
import './App.css'

import MainRouter from "./router/MainRouter"

const router = createBrowserRouter(MainRouter)

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
