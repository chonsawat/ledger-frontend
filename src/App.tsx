import { createBrowserRouter, RouterProvider } from "react-router"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import MainRouter from "./router/MainRouter"
import './App.css'

const router = createBrowserRouter(MainRouter)
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  )
}

export default App
