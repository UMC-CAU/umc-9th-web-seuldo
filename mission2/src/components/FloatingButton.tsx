import { useNavigate } from "react-router-dom";

const FloatingButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/floating");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-pink-500 hover:bg-pink-600 text-white text-3xl font-bold w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
    >
      +
    </button>
  );
};

export default FloatingButton;
