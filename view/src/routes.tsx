import { protectedRouteLoader } from "./main";
import AddProduct from "./routes/AddProduct";
import Cart from "./routes/Cart";
import Checkout from "./routes/Checkout";
import EditProfile from "./routes/EditProfile";
import Homepage from "./routes/Homepage";
import Login from "./routes/Login";
import OrderPage from "./routes/OrderPage";
import Orders from "./routes/Orders";
import ProductPage from "./routes/ProductPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./routes/Register";
import Success from "./routes/Success";

export const routes = [
  {
    path: "/",
    element: <Homepage />,
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
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    ),
    loader: protectedRouteLoader,
  },
  {
    path: "/orders/:id",
    element: (
      <ProtectedRoute>
        <OrderPage />
      </ProtectedRoute>
    ),
    loader: protectedRouteLoader,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <EditProfile />
      </ProtectedRoute>
    ),
    loader: protectedRouteLoader,
  },
];
