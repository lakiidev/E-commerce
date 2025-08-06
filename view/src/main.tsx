import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { routes } from "./routes.tsx";
import store, { AppDispatch } from "./store/store.ts";
import { checkLoginStatus } from "./store/userSlice/userSlice.ts";
import Providers from "./Providers.tsx";
import Navbar from "./components/Navbar.tsx";

export async function protectedRouteLoader() {
  const dispatch = store.dispatch as AppDispatch;
  const response = await dispatch(checkLoginStatus());
  if (checkLoginStatus.fulfilled.match(response)) {
    return {
      isLoggedIn: (response.payload as { isLoggedIn: boolean }).isLoggedIn,
    };
  }
  return {
    isLoggedIn: false,
  };
}

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <Navbar />
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);
