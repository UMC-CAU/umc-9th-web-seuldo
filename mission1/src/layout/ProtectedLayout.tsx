import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/navbar";
import Sidebar from "../components/Sidebar";
import { HamburgerProvider } from "../context/HamburgerContext";
import FloatingButton from "../components/FloatingButton";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const location = useLocation();

  if (!accessToken) {
    alert("로그인이 필요한 서비스입니다. 로그인 후 이용해주세요!");
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  return (
    <HamburgerProvider>
      <Navbar />
      <div className="bg-black min-h-screen">
        <Outlet />
        <FloatingButton />
      </div>
      <Sidebar />
    </HamburgerProvider>
  );
};

export default ProtectedLayout;
