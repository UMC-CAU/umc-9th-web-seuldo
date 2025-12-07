import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/Sidebar";
import { HamburgerProvider } from "../context/HamburgerContext";

const RootLayout = () => {
  return (
    <>
      <HamburgerProvider>
        <Navbar />
        <div className="bg-black min-h-screen">
          <Outlet />
        </div>
        <Sidebar />
      </HamburgerProvider>
    </>
  );
};

export default RootLayout;
