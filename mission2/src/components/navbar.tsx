import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const {logout, accessToken} = useAuth()
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="px-6 py-4 bg-gray-900 flex justify-between ">
      <p className="text-pink-600 text-2xl font-bold">돌려돌려LP판</p>
      <div>

        {!accessToken ? (
          <button className="w-20 px-2 py-1 bg-black text-white rounded hover:bg-gray-800 transition cursor-pointer"
            onClick={()=>(navigate("/login"))}
          >로그인</button>
        ) : (
          <button className="w-20 px-2 py-1 bg-white text-black rounded hover:bg-gray-800 transition cursor-pointer"
            onClick={handleLogout}
          >로그아웃</button>
        )}
        <button className="w-20 px-2 py-1 bg-pink-600 text-white rounded hover:bg-pink-500 transition cursor-pointer"
          onClick={()=>(navigate("/signup"))}
        >회원가입</button>
      </div>
    </nav>
  );
};

export default Navbar;