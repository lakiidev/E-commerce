import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./routes/Login.tsx";
import Register from "./routes/Register.tsx";
import { Toaster } from "sonner";
import { useDispatch } from "react-redux";
import { checkLoginStatus } from "./store/userSlice/userSlice.ts";
import store, { AppDispatch } from "./store/store.ts";
import { Provider } from "react-redux";
import Navbar from "./components/Navbar.tsx";
import AddProduct from "./routes/AddProduct.tsx";
import ProductPage from "./routes/ProductPage.tsx";
import Cart from "./routes/Cart.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import Checkout from "./routes/Checkout.tsx";
import Success from "./routes/Success.tsx";

// Load user cart on entry to app
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
  {
    path: "/products/add",
    element: <AddProduct />,
  },
  {
    path: "/products/:id",
    element: <ProductPage />,
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    ),
    loader: protectedRouteLoader,
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute checkout>
        <Checkout />
      </ProtectedRoute>
    ),
    loader: protectedRouteLoader,
  },
  {
    path: "/success",
    element: (
      <ProtectedRoute checkout>
        <Success />
      </ProtectedRoute>
    ),
    loader: protectedRouteLoader,
  },
]);

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    async function isLoggedIn() {
      await dispatch(checkLoginStatus());
    }
    isLoggedIn();
  }, [dispatch]);

  return (
    <div className="w-screen h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 -z-10 h-full w-full bg-[#FFFAF0] bg-[linear-gradient(to_right,#b4b4b4_0.3px,transparent_1px),linear-gradient(to_bottom,#b4b4b4_0.3px,transparent_1px)] bg-[size:144px_144px]"></div>
      <Navbar />
      {children}
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppWrapper>
        <RouterProvider router={router} />
        <Toaster
          richColors
          toastOptions={{
            classNames: {
              toast: "text-2xl",
            },
          }}
        />
      </AppWrapper>
    </Provider>
  </StrictMode>
);
