import { useContext, useState } from "react";
import { AppContext } from "../../../AppContext";
import { FaBars, FaChevronDown } from "react-icons/fa";
import logo from "../../assets/logo.png";
import enFlag from "../../assets/en.png";
import arFlag from "../../assets/ar.png";
import { navData } from "../../../data";
import { Link, useLocation } from "react-router-dom";

const flags = {
  en: enFlag,
  ar: arFlag,
};

const languages = {
  en: "English",
  ar: "Arabic",
};

function NavBar() {
  const location = useLocation();
  const { setIsNavBarShown, language, changeLanguage } = useContext(AppContext);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const texts = navData[language];
  const isArabic = language === "ar";

  return (
    <nav
      className={`${
        language === "ar" ? "arabic-font" : ""
      } nav-shadow fixed top-0 w-full z-10 bg-[#fff] flex items-center justify-between px-[20px] md:px-[50px] py-[20px]`}
    >
      <div>
        <Link to="/alnasr/menu">
          <img className="w-[90px]" src={logo} alt="logo" />
        </Link>
      </div>
      {location.pathname === "/alnasr/menu" ||
      location.pathname === "/alnasr/menu/" ? (
        <ul
          className={`hidden lg:flex items-center gap-[25px] ${
            isArabic ? "flex-row-reverse" : ""
          }`}
        >
          {Object.keys(texts).map((key) => (
            <li
              key={key}
              className="hover:text-main-yellow hover:border-b cursor-pointer font-medium text-second-black"
            >
              <a href={`#${key}`}>{texts[key]}</a>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="hidden lg:flex gap-[20px]">
        <button className="bg-second-yellow py-[5px] px-[20px] font-medium rounded-lg text-second-black border border-main-yellow hover:border-[#000] hover:text-main-yellow hover:bg-second-black duration-200">
          <Link to="/alnasr/menu/register">
            {isArabic ? "حساب جديد" : "Register"}
          </Link>
        </button>
        <button className="bg-second-yellow py-[5px] px-[20px] font-medium rounded-lg text-second-black border border-main-yellow hover:text-[#000] hover:bg-main-yellow duration-200">
          <Link to="/alnasr/menu/login">
            {isArabic ? "تسجيل الدخول" : "Login"}
          </Link>
        </button>
      </div>
      <div>
        <button
          onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
          className="border border-gray-300 rounded-md p-1 bg-special-gray text-black hover:text-dark-green cursor-pointer duration-300 ease-in-out flex items-center gap-[2px]"
        >
          <img
            src={flags[language]}
            alt={languages[language]}
            className="w-[16px] h-[16px] mr-1"
          />
          <p className="text-[10px]">{languages[language]}</p>
          <FaChevronDown className="ml-[1px]" />
        </button>
        {isLanguageDropdownOpen && (
          <div className="absolute right-0 mt-1 w-32 bg-white border rounded-md shadow-lg z-10">
            {Object.keys(languages).map((lang) => (
              <div
                key={lang}
                onClick={() => {
                  changeLanguage(lang);
                  setIsLanguageDropdownOpen(false);
                }}
                className="flex items-center p-1 cursor-pointer hover:bg-gray-200"
              >
                <img
                  src={flags[lang]}
                  alt={languages[lang]}
                  className="w-[16px] h-[16px] mr-1"
                />
                <p className="text-sm">{languages[lang]}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        onClick={() => setIsNavBarShown((prevVal) => !prevVal)}
        className="bg-main-yellow p-[7px] rounded-full cursor-pointer block lg:hidden ml-4"
      >
        <FaBars className="text-second-black" />
      </div>
    </nav>
  );
}

export default NavBar;
