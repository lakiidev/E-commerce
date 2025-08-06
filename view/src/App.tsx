import { Provider, useDispatch } from "react-redux";
import Layout from "./Layout";
import Providers from "./Providers";
import store, { AppDispatch } from "./store/store";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { checkLoginStatus } from "./store/userSlice/userSlice";

function App() {
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
      <main>
        <Outlet />
        <Toaster
          richColors
          toastOptions={{
            classNames: {
              toast: "text-2xl",
            },
          }}
        />
      </main>
    </div>
  );
}

export default App;
