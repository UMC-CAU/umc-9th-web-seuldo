import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useHamburger } from "../context/HamburgerContext";
import type { ResponseMyinfoDto } from "../types/auth";
import { useState, useEffect } from "react";
import { getMyInfo } from "../apis/auth";
import hamburgerIcon from "../assets/hamburger-button.svg"

const Navbar = () => {
  const { toggle } = useHamburger();
  const { logout, accessToken } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<ResponseMyinfoDto>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) return;
      const response = await getMyInfo();
      setData(response);
    };
    fetchData();
  }, [accessToken]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="px-6 py-4 bg-gray-900 flex justify-between ">
      <div className="relative flex items-center justify-center">
        <button
          id="hamburger-button"
          onClick={toggle}
          className="flex flex-col justify-between w-6 h-5 cursor-pointer"
        >
          <img src={hamburgerIcon} alt="menu" className="w-8 h-8 invert" />
        </button>
        <p className="px-5 text-pink-600 text-2xl font-bold">돌려돌려LP판</p>
      </div>
      <div>
        {!accessToken ? (
          <>
            <button
              className="w-20 px-2 py-1 bg-black text-white rounded hover:bg-gray-800 transition cursor-pointer"
              onClick={() => navigate("/login")}
            >
              로그인
            </button>
            <button
              className="w-20 px-2 py-1 bg-pink-600 text-white rounded hover:bg-pink-500 transition cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              회원가입
            </button>
          </>
        ) : (
          <>
            <span className="text-gray-200 px-2">
              {data.data?.name}님 반갑습니다.
            </span>
            <button
              className="w-20 px-2 py-1 bg-black text-white rounded hover:bg-gray-800 transition cursor-pointer"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
