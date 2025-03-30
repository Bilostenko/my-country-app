import { DarkMode, LightMode } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { toggleTheme } from "../../redux/slice";
// interface HeaderProps {

// }

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.app.theme);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <header className="rounded-sm py-8 px-16 mb-4 flex items-center justify-between bg-white shadow-[0px_4px_10px_rgba(0,0,0,0.1)] border-b border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600">
      <h1 className="text-2xl">Where in the world?</h1>

      <button className=""
       onClick={handleThemeToggle}>
        {theme === "dark" ? (
          <LightMode className="text-yellow-400" />
        ) : (
          <DarkMode className="text-gray-900 dark:text-gray-200" />
        )}
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Header;
