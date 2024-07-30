import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaChevronDown, FaCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { auth } from "../../../firebase";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import useFetchUsers from "../../../custom-hooks/useFetchUsers";
import { useContext, useState } from "react";
import { AppContext } from "../../../AppContext";

import enFlag from "../../assets/en.png";
import arFlag from "../../assets/ar.png";

const flags = {
  en: enFlag,
  ar: arFlag,
};

const languages = {
  en: "English",
  ar: "Arabic",
};

function MainNavbar() {
  const { changeLanguage, language } = useContext(AppContext);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { isMainNavBarShown, setIsMainNavBarShown } = useContext(AppContext);
  const isArabic = language === "ar";
  const navigate = useNavigate();

  const { userDoc } = useFetchUsers();

  console.log(isMainNavBarShown);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/alnasr/menu/login", { replace: true });
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  return (
    <nav
      className={`${
        isArabic
          ? "lg:mr-[20%] flex-row-reverse arabic-font"
          : "ml-[0px] lg:ml-[20%]"
      } ${
        isMainNavBarShown && isArabic
          ? "mr-[100px]"
          : !isMainNavBarShown && isArabic
          ? "mr-[0px]"
          : isMainNavBarShown && !isArabic
          ? "ml-[100px]"
          : "ml-[0px]"
      } nav-shadow flex justify-between gap-[20px] items-center p-[20px]`}
    >
      <div
        className="block lg:hidden cursor-pointer"
        onClick={() => setIsMainNavBarShown((prevVal) => !prevVal)}
      >
        <FaBars />
      </div>
      <div className={`${isArabic ? "text-right" : "text-left"}`}>
        {userDoc?.role == "user" ? (
          <h2 className="text-sm sm:text-lg font-semibold text-[#000]">
            {isArabic
              ? `${userDoc?.firstName} مرحبًا`
              : `Hello ${userDoc?.firstName}`}
          </h2>
        ) : (
          <h2 className="text-sm sm:text-lg font-semibold text-[#000]">
            {isArabic ? "مرحبا أيها الأدمن" : "Hello Admin"}
          </h2>
        )}
        <p className="text-xs sm:text-sm lg:text-base text-second-black">
          {isArabic ? "شاهد ما الجديد اليوم" : "See what is happening today"}
        </p>
      </div>
      <div
        className={`flex ${
          isArabic ? "flex-row-reverse" : ""
        } items-center gap-[20px] text-second-black text-lg sm:text-xl lg:text-2xl`}
      >
        <div className="relative">
          <button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="border border-gray-300 rounded-md p-1 bg-special-gray text-black hover:text-dark-green cursor-pointer duration-300 ease-in-out flex items-center gap-[2px]"
          >
            <img
              src={flags[language]}
              alt={languages[language]}
              className="w-[16px] h-[16px] mr-1"
            />
            <p className="text-sm">{languages[language]}</p>
            <FaChevronDown className="ml-[1px] text-xs" />
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
        <div>
          <Link to="/alnasr/home/settings">
            {userDoc?.role == "user" ? (
              <img
                src={userDoc?.profilePicture}
                className="w-[30px] h-[30px] object-cover rounded-full border-2 border-second-black"
              />
            ) : (
              <FaCircle />
            )}
          </Link>
        </div>
        <div className="cursor-pointer" onClick={handleSignOut}>
          <IoLogOut />
        </div>
      </div>
    </nav>
  );
}

export default MainNavbar;
