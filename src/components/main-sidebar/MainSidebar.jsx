import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaHome,
  FaMoneyBill,
  FaCog,
  FaUserAlt,
  FaPaperPlane,
} from "react-icons/fa";
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
        {userDoc?.role !== "admin" && (
          <li className="hover:bg-special-blue font-semibold text-second-black hover:text-main-black text-lg rounded-lg">
            <NavLink
              to="/alnasr/home/transactions"
              className="flex items-center gap-[8px] px-[10px] py-[8px] rounded-lg"
              style={
                location.pathname === "/alnasr/home/transactions" ||
                location.pathname === "/alnasr/home/transactions/income" ||
                location.pathname === "/alnasr/home/transactions/expense"
                  ? activeStyles
                  : null
              }
            >
              <FaMoneyBill />
              <p className="hidden lg:block">Transactions</p>
            </NavLink>
          </li>
        )}
        {userDoc?.role !== "admin" && (
          <li className="hover:bg-special-blue font-semibold text-second-black hover:text-main-black text-lg rounded-lg">
            <NavLink
              to="/alnasr/home/send-money"
              className="flex items-center gap-[8px] px-[10px] py-[8px] rounded-lg"
              style={
                location.pathname === "/alnasr/home/send-money"
                  ? activeStyles
                  : null
              }
            >
              <FaPaperPlane />
              <p className="hidden lg:block">Send Money</p>
            </NavLink>
          </li>
        )}
        <li className="hover:bg-special-blue font-semibold text-second-black hover:text-main-black text-lg rounded-lg">
          <NavLink
            to="/alnasr/home/accounts"
            className="flex items-center gap-[8px] px-[10px] py-[8px] rounded-lg"
            style={
              location.pathname === "/alnasr/home/accounts"
                ? activeStyles
                : null
            }
          >
            <FaUserAlt />
            <p className="hidden lg:block">Accounts</p>
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