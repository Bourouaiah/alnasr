import { FaBars, FaChevronDown } from "react-icons/fa";

import logo from "../../assets/logo.png";
import enFlag from "../../assets/en.png";
import arFlag from "../../assets/ar.png";
import { useState } from "react";

import { navData } from "../../../data";
import { Link } from "react-router-dom";

const flags = {
  en: enFlag,
  ar: arFlag,
};

const languages = {
  en: "English",
  ar: "Arabic",
};

function NavBar({ setIsNavBarShown, language, changeLanguage }) {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const texts = navData[language];
  const isArabic = language === "ar";
  return (
    <nav className="nav-shadow flex items-center justify-between px-[20px] md:px-[50px] py-[20px]">
      <div>
        <img className="w-[90px]" src={logo} alt="logo" />
      </div>
      <ul className="hidden lg:flex items-center gap-[25px]">
        {Object.keys(texts).map((key) => (
          <li
            key={key}
            className="hover:text-main-yellow hover:border-b cursor-pointer font-medium text-second-black"
          >
            <Link
              to="/alnasr/menu"
            >
              {texts[key]}
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden lg:flex gap-[20px]">
        <button className="bg-second-yellow py-[5px] px-[20px] font-medium rounded-lg text-second-black border border-main-yellow hover:border-[#000] hover:text-main-yellow hover:bg-second-black duration-200">
         <Link to="/alnasr/menu/register">Register</Link>
        </button>
        <button className="bg-second-yellow py-[5px] px-[20px] font-medium rounded-lg text-second-black border border-main-yellow hover:text-[#000] hover:bg-main-yellow duration-200">
        <Link to="/alnasr/menu/login">Login</Link>
        </button>
      </div>
      <div className="relative">
        <button
          onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
          className="border-2 border-gray-300 rounded-md p-1 bg-special-gray text-black hover:text-dark-green cursor-pointer duration-300 ease-in-out flex items-center gap-[3px]"
        >
          <img
            src={flags[language]}
            alt={languages[language]}
            className="w-[20px] h-[20px] mr-2"
          />
          <p>{languages[language]}</p>
          <FaChevronDown className="ml-[2px]" />
        </button>
        {isLanguageDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-[#fff] border rounded-md shadow-lg z-10">
            {Object.keys(languages).map((lang) => (
              <div
                key={lang}
                onClick={() => {
                  changeLanguage(lang);
                  setIsLanguageDropdownOpen(false);
                }}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
              >
                <img
                  src={flags[lang]}
                  alt={languages[lang]}
                  className="w-[20px] h-[20px] mr-2"
                />
                {languages[lang]}
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