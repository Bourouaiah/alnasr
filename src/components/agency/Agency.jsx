import { Link } from "react-router-dom";
import landingTwo from "../../assets/landing-two.png";
import { AppContext } from "../../../AppContext";
import { useContext } from "react";
import { agencyData } from "../../../data";

function Agency() {
  const { language } = useContext(AppContext);
  const data = agencyData[language];
  const isArabic = language === "ar";
  return (
    <section id="Agency" className={`${isArabic ? "arabic-font flex-row-reverse lg:gap-[50px]" : ""} px-[20px] md:px-[50px] py-[50px] flex flex-wrap md:flex-nowrap gap-[50px] lg:gap-[20px] items-center bg-[#F3FFFE]`}>
      <div className="w-full md:w-[50%] mx-auto">
        <img className="w-[100%] lg:w-[80%]" src={landingTwo} alt="" />
      </div>
      <div className="w-full md:w-[50%]">
        <h1 className={`text-center ${isArabic ? "md:text-right" : "md:text-left"} md:text-left text-[30px] lg:text-[54px] font-semibold`}>
          {data.title}
        </h1>
        <p className={`text-center ${isArabic ? "md:text-right" : "md:text-left"} text-[15px] lg:text-[18px] my-[40px]`}>
          {data.description}
        </p>
        <div className={`flex ${isArabic ? "flex-row-reverse" : ""} justify-center md:items-start gap-[20px]`}>
          <Link to="/alnasr/menu/register" className="bg-main-yellow py-[10px] px-[20px] font-medium rounded-2xl text-second-black border border-main-yellow hover:text-main-yellow hover:bg-second-black duration-200">
          {isArabic ? "انضم الآن" : "Join now"}
          </Link>
          <button className="bg-[#F3FFFE] py-[10px] px-[20px] font-medium rounded-2xl text-main-yellow border border-main-yellow hover:text-main-yellow hover:bg-second-black duration-200">
            <a href="#Contact Us">{isArabic ? "تواصل" : "Contact Us"}</a>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Agency;
