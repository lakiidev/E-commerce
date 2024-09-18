import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./routes/Login.tsx";
import Register from "./routes/Register.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

// Load user cart on entry to app
useEffect(() => {
  async function isLoggedIn() {
    await dispatch(checkLoginStatus());
  }

  isLoggedIn();
}, [dispatch]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        richColors
        toastOptions={{
          classNames: {
            toast: "text-2xl",
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>
);
