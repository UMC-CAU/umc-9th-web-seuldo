import { useHamburger } from "../context/HamburgerContext";
import hamburgerIcon from "../assets/hamburger-button.svg"
import { Link } from "react-router-dom";


const Sidebar = () => {
  const { isOpen, toggle, sidebarRef } = useHamburger();

  return (
    <aside
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full w-60 bg-[#111] text-white flex flex-col justify-between py-6 px-5 z-40 transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full"} `}
    >
      <div>
        <div className="flex items-center gap-3 mb-8 ml-2">
          <button
            onClick={toggle}
            className="flex flex-col justify-between w-6 h-5 cursor-pointer"
          >
            <img src={hamburgerIcon} alt="menu" className="w-8 h-8 invert" />
          </button>

          <h1 className="text-2xl font-bold text-pink-500">DOLIGO</h1>
        </div>

        <nav className="flex flex-col gap-5 text-gray-300">
          <Link to="/search" className="hover:text-white hover:font-bold transition-colors cursor-pointer">
            찾기
          </Link>
          <Link to="/my" className="hover:text-white hover:font-bold transition-colors cursor-pointer">
            마이페이지
          </Link>
        </nav>
      </div>

      <div className="text-sm text-gray-400">
        <span className="hover:text-red-400 transition-colors cursor-pointer">
          탈퇴하기
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
