import { Link, Route } from "react-router-dom";
import i18n from "./i18n";
import UploadForm from "./UploadForm";
import { useTranslation } from "react-i18next";
const Header = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-blue-600 text-white px-6 py-4 shadow-md flex flex-col md:flex-row items-center justify-between">
      <h1
        className="text-2xl font-bold mb-2 md:mb-0 cursor-pointer"
        onClick={() => (window.location.href = "/")}
      >
        🩺 {t("title")}
      </h1>
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
        {/* Language Switcher */}
        <div className="flex space-x-2">
          <button
            onClick={() => changeLanguage("en")}
            className="px-3 py-1 bg-white text-blue-600 rounded-full hover:bg-blue-100 transition"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage("hi")}
            className="px-3 py-1 bg-white text-blue-600 rounded-full hover:bg-blue-100 transition"
          >
            हिन्दी
          </button>
          <button
            onClick={() => changeLanguage("bn")}
            className="px-3 py-1 bg-white text-blue-600 rounded-full hover:bg-blue-100 transition"
          >
            বাংলা
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link to="/login" className="hover:underline hover:text-gray-200">
            {t("login")}
          </Link>
          <Link to="/signup" className="hover:underline hover:text-gray-200">
            {t("signup")}
          </Link>
          <Link to="/show" className="hover:underline hover:text-gray-200">
            {t("history")}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
