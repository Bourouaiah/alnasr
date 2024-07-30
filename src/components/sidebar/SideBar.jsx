import { useContext } from "react";
import { AppContext } from "../../../AppContext";
import logo from "../../assets/logo.png";
import {
  FaTimes,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { sidebarData } from "../../../data";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const { isNavBarShown, setIsNavBarShown, language } = useContext(AppContext);
  const texts = sidebarData[language];
  const isArabic = language === "ar";

  const handleLinkClick = () => {
    setIsNavBarShown(false);
  };

  return (
    <div
      className={`w-full sidebar-shadow top-0 ${
        isNavBarShown ? "left-0" : "left-[-100%]"
      } ${
        isArabic ? "arabic-font" : ""
      } h-full fixed lg:hidden duration-500 ease-in-out z-20 bg-[#fff]`}
    >
      <div className="nav-shadow flex items-center justify-between p-[20px] bottom-shadow mb-[20px]">
        <div className="flex items-center">
          <Link to="/alnasr/menu" onClick={handleLinkClick}>
            <img className="w-[70px]" src={logo} alt="logo" />
          </Link>
        </div>
        <div
          onClick={() => setIsNavBarShown(false)}
          className="bg-main-yellow p-[7px] rounded-full cursor-pointer"
        >
          <FaTimes className="text-second-black" />
        </div>
      </div>
      {(location.pathname === "/alnasr/menu" || location.pathname === "/alnasr/menu/") && (
        <ul className="flex flex-col items-center px-[10px] gap-[10px]">
          {Object.keys(texts).map((key) => (
            <li
              key={key}
              className="bg-second-black w-full p-[5px] text-main-yellow text-center rounded-lg border border-main-yellow"
            >
              <a onClick={() => setIsNavBarShown(false)} href={`#${key}`}>{texts[key]}</a>
            </li>
          ))}
        </ul>
      )}
      <div className="absolute w-full bottom-[65px] left-0 flex flex-col gap-[15px] px-[20px] pb-[20px]">
        <Link
          className="flex-grow text-center border border-[#000] bg-main-yellow p-[10px] font-semibold rounded-2xl duration-150 ease-in-out"
          to="/alnasr/menu/login"
          onClick={handleLinkClick}
        >
          {isArabic ? "تسجيل الدخول" : "Login"}
        </Link>
        <Link
          className="flex-grow text-center border border-[#000] text-[#000] text-[15px] font-semibold bg-main-yellow p-[10px] rounded-2xl duration-150 ease-in-out"
          to="/alnasr/menu/register"
          onClick={handleLinkClick}
        >
          {isArabic ? "إنشاء حساب" : "Register"}
        </Link>
      </div>
      <ul className="absolute bg-[#000] w-full py-[20px] bottom-0 left-1/2 translate-x-[-50%] flex justify-center gap-[20px] text-3xl">
        <li className="text-gray-500 duration-200 ease-in-out cursor-pointer">
          <FaFacebook className="text-[#fff] hover:text-main-yellow" />
        </li>
        <li className="text-gray-500 duration-200 ease-in-out cursor-pointer">
          <FaInstagram className="text-[#fff] hover:text-main-yellow" />
        </li>
        <li className="text-gray-500 duration-200 ease-in-out cursor-pointer">
          <FaLinkedin className="text-[#fff] hover:text-main-yellow" />
        </li>
        <li className="text-gray-500 duration-200 ease-in-out cursor-pointer">
          <FaTwitter className="text-[#fff] hover:text-main-yellow" />
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
