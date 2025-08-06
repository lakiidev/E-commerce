import React, { FC } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <Toaster
        richColors
        toastOptions={{
          classNames: {
            toast: "text-xl",
          },
        }}
      />
      {children}
    </Provider>
  );
};

export default Providers;
