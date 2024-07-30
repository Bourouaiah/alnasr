import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../firebase";

import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "../../../AppContext";

function Login() {
  const { language } = useContext(AppContext);
  const isArabic = language === "ar";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const loginInWithUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/alnasr/home");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <section
      className={`${
        isArabic ? "arabic-font" : ""
      } px-[20px] md:px-[50px] md:w-[70%] lg:w-[50%] md:mx-auto pt-[120px]`}
    >
      <div>
        <h2 className="text-second-black text-2xl md:text-3xl text-center font-semibold">
          {isArabic ? "أهلاً بعودتك" : "Welcome Back"}
        </h2>
        <div className={`${isArabic ? "flex-row-reverse" : ""} flex justify-center gap-[5px] text-sm my-[20px]`}>
          <p className="text-second-black">
            {isArabic ? "جديد في الناصر ؟" : "New to alnasr"}
          </p>
          <Link
            to="/alnasr/menu/register"
            className="text-[#000] underline font-semibold"
          >
            {isArabic ? "أنشئ حساب" : "Signup"}
          </Link>
        </div>
      </div>
      <form className="mb-[20px]" action="">
        <div className="flex flex-col gap-[8px]">
          <label className={`${isArabic ? "text-right" : ""} text-second-black text-sm`} htmlFor="user-email">
            {isArabic ? "الِايميل الخاص بك" : "Your email adress"}
          </label>
          <input
            className={`${isArabic ? "text-right" : ""} rounded-[5px] p-[8px] border-2 border-third-black hover:border-second-black duration-500 ease-in-out outline-[#000]`}
            type="email"
            name="user-email"
            placeholder={isArabic ? "الِايميل" : "Email adress"}
            id=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-[8px] my-[30px]">
          <label className={`${isArabic ? "text-right" : ""} text-second-black text-sm`} htmlFor="user-password">
            {isArabic ? "كلمة السر الخاصة بك" : "Your password"}
          </label>
          <div className={`${isArabic ? "flex-row-reverse" : "flex-row"} flex justify-between items-center rounded-md p-[8px] border-2 border-third-gray hover:border-second-gray duration-500 ease-in-out outline-main-blue`}>
            <input
              className={`${isArabic ? "text-right" : ""} outline-none border-none flex-grow`}
              onChange={(e) => setPassword(e.target.value)}
              type={`${showPassword ? "text" : "password"}`}
              name="user-password"
              placeholder={isArabic ? "كلمة السر" : "Password"}
              id=""
              value={password}
            />
            <div
              onClick={handleTogglePassword}
              className="text-second-black cursor-pointer"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        </div>
        <button
          onClick={loginInWithUser}
          className="w-full p-[10px] text-second-black hover:text-[#000] text-[15px] font-semibold bg-second-yellow rounded-3xl hover:bg-main-yellow duration-150 ease-in-out"
        >
          {isArabic ? "تسجيل الدخول" : "Login"}
        </button>
      </form>
      <Link className="text-main-black font-semibold underline">
        <p className={`${isArabic ? "text-right" : ''}`}>{isArabic ? "حدث خطأ أثناء تسجيل الدخول ؟" : "Trouble logging in?"}</p>
      </Link>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
}

export default Login;
