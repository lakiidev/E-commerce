import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLoaderData } from "react-router-dom";
import { RootState } from "../store/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  checkout?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  checkout,
}) => {
  const { isLoggedIn } = useLoaderData() as { isLoggedIn: boolean };
  const { items } = useSelector((state: RootState) => state.cart);
  if (isLoggedIn) {
    if (checkout && items.length === 0) {
      return <Navigate to="/cart" />;
    }
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
