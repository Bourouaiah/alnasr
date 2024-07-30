import { useContext } from "react";
import logo from "../../assets/logo.png";
import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaCog, FaUserAlt } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";

import { AppContext } from "../../../AppContext";

function MainSidebar() {
  const { language, isMainNavBarShown } = useContext(AppContext);
  const isArabic = language === "ar";
  const activeStyles = {
    color: "#FFC265",
  };

  const location = useLocation();

  return (
    <div
      className={`${isArabic ? "arabic-font lg:right-0" : "lg:left-0"} ${
        isMainNavBarShown && isArabic
          ? "right-[0px]"
          : !isMainNavBarShown && isArabic
          ? "right-[-100px]" :
          isMainNavBarShown && !isArabic ?
          "left-[0px]" : "left-[-100px]"
      } fixed mainsidebar-shadow p-[30px] top-0 h-full w-[100px] lg:w-[20%] bg-white duration-200 ease-out z-10`}
    >
      <div className="flex justify-center">
        <img className="w-[90px]" src={logo} alt="logo" />
      </div>
      <ul className="flex flex-col mt-[40px] gap-[20px]">
        <li className="hover:bg-special-blue font-semibold text-second-black hover:text-main-black text-lg rounded-lg">
          <NavLink
            to="/alnasr/home"
            className={`flex ${
              isArabic ? "flex-row-reverse" : ""
            } items-center gap-[8px] px-[10px] py-[8px] rounded-lg`}
            style={location.pathname === "/alnasr/home" ? activeStyles : null}
          >
            <FaHome />
            <p className="hidden lg:block">
              {isArabic ? "نظرة عامّة" : "Overview"}
            </p>
          </NavLink>
        </li>
        <li className="hover:bg-special-blue font-semibold text-second-black hover:text-main-black text-lg rounded-lg">
          <NavLink
            to="/alnasr/home/services"
            className={`flex ${
              isArabic ? "flex-row-reverse" : ""
            } items-center gap-[8px] px-[10px] py-[8px] rounded-lg`}
            style={
              location.pathname === "/alnasr/home/services" ||
              location.pathname === "/alnasr/home/services/accommodation" ||
              location.pathname === "/alnasr/home/services/health" ||
              location.pathname === "/alnasr/home/services/security" ||
              location.pathname === "/alnasr/home/services/facilities" ||
              location.pathname === "/alnasr/home/services/communication" ||
              location.pathname === "/alnasr/home/services/education" ||
              location.pathname === "/alnasr/home/services/food"
                ? activeStyles
                : null
            }
          >
            <MdMiscellaneousServices />
            <p className="hidden lg:block">
              {isArabic ? "الخدمات" : "Services"}
            </p>
          </NavLink>
        </li>
        <li className="hover:bg-special-blue font-semibold text-second-black hover:text-main-black text-lg rounded-lg">
          <NavLink
            to="/alnasr/home/users"
            className={`flex ${
              isArabic ? "flex-row-reverse" : ""
            } items-center gap-[8px] px-[10px] py-[8px] rounded-lg`}
            style={
              location.pathname === "/alnasr/home/users" ? activeStyles : null
            }
          >
            <FaUserAlt />
            <p className="hidden lg:block">
              {isArabic ? "المستخدمين" : "Users"}
            </p>
          </NavLink>
        </li>
        <li className="hover:bg-special-blue font-semibold text-second-black hover:text-main-black text-lg rounded-lg">
          <NavLink
            to="/alnasr/home/settings"
            className={`flex ${
              isArabic ? "flex-row-reverse" : ""
            } items-center gap-[8px] px-[10px] py-[8px] rounded-lg`}
            style={
              location.pathname === "/alnasr/home/settings"
                ? activeStyles
                : null
            }
          >
            <FaCog />
            <p className="hidden lg:block">
              {isArabic ? "الإعدادات" : "Settings"}
            </p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default MainSidebar;
