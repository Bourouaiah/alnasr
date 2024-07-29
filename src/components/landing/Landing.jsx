import { Link } from "react-router-dom";
import landingOne from "../../assets/landing-one.png";
import { useContext } from "react";
import { AppContext } from "../../../AppContext";
import { landingData } from "../../../data";

function Landing() {
  const { language } = useContext(AppContext);
  const data = landingData[language];
  const isArabic = language === "ar";
  return (
    <section
      id="Home"
      className={`${
        isArabic ? "arabic-font flex-row-reverse text-right" : ""
      } pt-[120px] px-[20px] md:px-[50px] py-[50px] gap-[50px] lg:gap-[20px] flex flex-wrap md:flex-nowrap items-center`}
    >
      <div className="w-full md:w-[50%] md:block flex flex-col">
        <h1 className={`${
        isArabic ? "md:text-right" : "md:text-left"
      } text-center text-[30px] lg:text-[54px] font-semibold`}>
          {data.title}
        </h1>
        <p className={`text-center ${isArabic ? "md:text-right" : "md:text-left"} md:text-left text-[15px] lg:text-[18px] my-[40px]`}>
          {data.description}
        </p>
        <Link
          to="/alnasr/menu/register"
          className="mx-auto bg-main-yellow py-[10px] px-[20px] font-medium rounded-2xl text-second-black border border-main-yellow hover:text-main-yellow hover:bg-second-black duration-200"
        >
          {isArabic ? "انضم الآن" : "Join now"}
        </Link>
      </div>
      <div className="w-full md:w-[50%]">
        <img className="w-[100%] lg:w-[80%]" src={landingOne} alt="" />
      </div>
    </section>
  );
}

export default Landing;
