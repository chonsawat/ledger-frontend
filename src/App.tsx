import { createBrowserRouter, RouterProvider } from "react-router"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import MainRouter from "./router/MainRouter"
import './App.css'
import { Toaster } from "react-hot-toast"

const router = createBrowserRouter(MainRouter)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router}></RouterProvider>
      <Toaster
        position="bottom-left"
        gutter={12}
        containerStyle={{ margin: "10px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "black",
            color: "white",
          },
        }}
      />
    </QueryClientProvider>
  )
}

export default App
