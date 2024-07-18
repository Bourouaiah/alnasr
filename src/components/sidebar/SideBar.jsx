import logo from "../../assets/logo.png";
import {
  FaTimes,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { sidebarData } from "../../../data";

function Sidebar({ isNavBarShown, setIsNavBarShown, language }) {
  const texts = sidebarData[language];
  const isArabic = language === "ar";

  const handleLinkClick = () => {
    setIsNavBarShown(false);
  };

  return (
    <div
      className={`w-full sidebar-shadow top-0 ${
        isNavBarShown ? "left-0" : "left-[-100%]"
      } h-full fixed lg:hidden duration-500 ease-in-out z-20 bg-[#fff]`}
    >
      <div className="flex items-center justify-between p-[20px] bottom-shadow mb-[20px]">
        <div className="flex items-center">
          <img className="w-[70px]" src={logo} alt="logo" />
        </div>
        <div
          onClick={() => setIsNavBarShown(false)}
          className="bg-main-yellow p-[7px] rounded-full cursor-pointer"
        >
          <FaTimes className="text-second-black" />
        </div>
      </div>
      <ul className="flex flex-col items-center px-[10px] gap-[10px]">
        {Object.keys(texts).map((key) => (
          <li
            key={key}
            className="bg-[#000] w-full text-main-yellow text-center p-[8px] rounded-lg"
          >
            <a href={`#${key}`} onClick={handleLinkClick}>
              {texts[key]}
            </a>
          </li>
        ))}
      </ul>
      <ul className="absolute bg-[#000] w-full py-[20px] bottom-0 left-1/2 translate-x-[-50%] flex justify-center gap-[20px] text-3xl">
        <li className="text-gray-500  duration-200 ease-in-out cursor-pointer">
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