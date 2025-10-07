const Navbar = () => {
  return (
    <nav className="px-6 py-4 bg-gray-900 flex justify-between ">
      <p className="text-pink-600 text-2xl font-bold">돌려돌려LP판</p>
      <div>
        <button className="w-20 px-2 py-1 bg-black text-white rounded hover:bg-gray-800 transition cursor-pointer">로그인</button>
        <button className="w-20 px-2 py-1 bg-pink-600 text-white rounded hover:bg-pink-500 transition cursor-pointer">회원가입</button>
      </div>
    </nav>
  );
};

export default Navbar;