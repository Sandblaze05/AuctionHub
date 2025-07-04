import { useNavigate } from "react-router-dom";

const Header = ({ toggleDarkMode, darkMode }) => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md dark:shadow-gray-700">
      <h1 className="text-2xl font-bold">AuctionHub</h1>
      <button
        onClick={() => navigate('/login')}
        className="bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded text-sm"
      >
        login
      </button>
    </header>
  );
};

export default Header;
