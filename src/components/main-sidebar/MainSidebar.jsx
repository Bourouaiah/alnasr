import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaHome,
  FaMoneyBill,
  FaCog,
  FaUserAlt,
} from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function MainSidebar() {
  const activeStyles = {
    color: "#FFC265",
  };

  const [userDoc, setUserDoc] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const usersQuery = query(
            collection(db, "users"),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(usersQuery);
          querySnapshot.forEach((doc) => {
            setUserDoc(doc.data());
          });
        }
      });
    };
    fetchData();
  }, []);

  const location = useLocation();

  return (
    <div className="fixed mainsidebar-shadow p-[30px] left-0 top-0 h-full w-[100px] lg:w-[20%]">
      <div className="flex justify-center">
        <img className="w-[90px]" src={logo} alt="logo" />
      </div>
      <ul className="flex flex-col mt-[40px] gap-[20px]">
        <li className="hover:bg-special-blue font-semibold text-second-black hover:text-main-black text-lg rounded-lg">
          <NavLink
            to="/alnasr/home"
            className="flex items-center gap-[8px] px-[10px] py-[8px] rounded-lg"
            style={location.pathname === "/alnasr/home" ? activeStyles : null}
          >
            <FaHome />
            <p className="hidden lg:block">Overview</p>
          </NavLink>
        </li>
        <li className="hover:bg-special-blue font-semibold text-second-black hover:text-main-black text-lg rounded-lg">
          <NavLink
            to="/alnasr/home/services"
            className="flex items-center gap-[8px] px-[10px] py-[8px] rounded-lg"
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
            <p className="hidden lg:block">Services</p>
          </NavLink>
        </li>
        <li className="hover:bg-special-blue font-semibold text-second-black hover:text-main-black text-lg rounded-lg">
          <NavLink
            to="/alnasr/home/users"
            className="flex items-center gap-[8px] px-[10px] py-[8px] rounded-lg"
            style={
              location.pathname === "/alnasr/home/users"
                ? activeStyles
                : null
            }
          >
            <FaUserAlt />
            <p className="hidden lg:block">Users</p>
          </NavLink>
        </li>
        <li className="hover:bg-special-blue font-semibold text-second-black hover:text-main-black text-lg rounded-lg">
          <NavLink
            to="/alnasr/home/settings"
            className="flex items-center gap-[8px] px-[10px] py-[8px] rounded-lg"
            style={
              location.pathname === "/alnasr/home/settings"
                ? activeStyles
                : null
            }
          >
            <FaCog />
            <p className="hidden lg:block">Settings</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default MainSidebar;
