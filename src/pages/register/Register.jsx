import { useState, useRef, useEffect, useContext } from "react";
import emailjs from "@emailjs/browser";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "../../../AppContext";

function generateRandomNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

function Register() {
  const { language } = useContext(AppContext);
  const isArabic = language === "ar";
  const navigate = useNavigate();
  const form = useRef();
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [email, setEmail] = useState("");
  const [verifyCodeValue, setVerifyCodeValue] = useState("");
  const [showVerificationCodeInput, setShowVerificationCodeInput] =
    useState(false);
  const [showSendverificationCodeButton, shetShowSendverificationCodeButton] =
    useState(true);
  const [showRegisterButton, setShowRegisterButton] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRandomNumber(generateRandomNumber());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSendVerificationCode = () => {
    toast.promise(
      emailjs.sendForm("service_ddw9jud", "template_yulukwf", form.current, {
        publicKey: "hhmcLXrE3BexHveR_",
      }),
      {
        loading: "Sending verification code...",
        success: () => {
          setShowVerificationCodeInput(true);
          shetShowSendverificationCodeButton(false);
          return "Verification code sent successfully!";
        },
        error: () => {
          return "Enter an exist email please!";
        },
      }
    );
  };

  const handleVerifyCode = () => {
    if (verifyCodeValue == randomNumber) {
      toast.success("Verification code is correct, register now!");
      setShowRegisterButton(true);
      setShowVerificationCodeInput(false);
    } else {
      toast.error("Verification code is incorrect, try again!");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email!");
    } else {
      setLoading(true);
      navigate("/alnasr/menu/user-collect-data", {
        state: { email, role: "user" },
      });
    }
  };

  return (
    <section
      className={`${
        isArabic ? "arabic-font" : ""
      } px-[20px] md:px-[50px] md:w-[70%] lg:w-[50%] md:mx-auto pt-[120px]`}
    >
      <div>
        <h2 className="text-second-black text-2xl md:text-3xl text-center font-semibold">
          {isArabic ? "أنشئ حسابك في الناصر" : "Create your Al Nasr account"}
        </h2>
        <div className={`${isArabic ? "flex-row-reverse" : ""} flex justify-center gap-[5px] text-sm mt-[10px]`}>
          <p className="text-second-black">
            {isArabic ? "لديك حساب ؟" : "Already have an account?"}
          </p>
          <Link
            to="/alnasr/menu/login"
            className="text-second-black underline font-semibold"
          >
            {isArabic ? "تسجيل الدخول" : "Log in"}
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit} ref={form} className="my-[50px]" action="">
        <div className="flex flex-col">
          <label className={`${isArabic ? "text-right" : "text-left"} text-second-black text-sm`} htmlFor="user-email">
            {isArabic
              ? "أولاً، أدخل عنوان بريدك الإلكتروني"
              : "First, enter your email address"}
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className={`${isArabic ? "text-right" : "text-left"} mt-[10px] rounded-[5px] p-[8px] border-2 border-second-black hover:border-[#000] duration-500 ease-in-out outline-[#000]`}
            type="email"
            name="user-email"
            id="user-email"
            placeholder={isArabic ? "الِايميل الخاص بك" : "Your email"}
            disabled={showRegisterButton}
          />
        </div>
        {showSendverificationCodeButton ? (
          <button
            onClick={handleSendVerificationCode}
            className="mt-4 w-full p-3 text-second-black hover:text-[#000] font-semibold bg-second-yellow rounded-md hover:bg-main-yellow"
          >
            {isArabic ? "أرسل رمز التحقق" : "Send Verification code"}
          </button>
        ) : null}
        {showVerificationCodeInput ? (
          <div className="my-4">
            <input
              type="number"
              placeholder="Enter verification code"
              className="w-full p-3 border rounded-md"
              maxLength={6}
              value={verifyCodeValue}
              onChange={(e) => setVerifyCodeValue(e.target.value)}
            />
            <button
              onClick={handleVerifyCode}
              className="mt-4 w-full p-3 text-second-black hover:text-[#000] font-semibold bg-second-yellow rounded-md hover:bg-main-yellow"
            >
              {isArabic ? "تحقق من الرمز" : "Verify code"}
            </button>
          </div>
        ) : null}
        <div>
          <textarea
            className="hidden"
            name="message"
            value={`Your verification code is ${randomNumber}`}
          />
        </div>

        <button
          onClick={handleRegister}
          className="mt-6 w-full p-[10px] text-[#000] text-[15px] font-semibold bg-main-yellow rounded-3xl hover:bg-main-blue duration-150 ease-in-out"
          disabled={!showRegisterButton}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="mr-2">{isArabic ? "يتم إنشاء حسابك" : "Registering ..."}</div>
              <div className="loader"></div>
            </div>
          ) : (
            <p>{isArabic ? "إنشاء حساب" : "Register"}</p>
          )}
        </button>
      </form>

      {/* <div className={`flex flex-col mb-[20px] ${isArabic ? "text-right" : "text-left"}`}>
        <Link
          to="/alnasr/menu/registerasadmin"
          className="text-[#000] font-semibold underline"
        >
          {isArabic ? "إنشاء حساب كأدمن ؟" : "Register as admin?"}
        </Link>
      </div> */}
      <div>
        <p className="text-sm text-second-black text-center mt-[40px]">
          By registering, you accept our{" "}
          <Link className="text-[#000] underline font-semibold">
            Terms of use
          </Link>{" "}
          and{" "}
          <Link className="text-[#000] underline font-semibold">
            Privacy Policy
          </Link>
        </p>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
}

export default Register;
