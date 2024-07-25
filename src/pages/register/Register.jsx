import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function generateRandomNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

function Register() {
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
    <section className="px-[20px] md:px-[50px] md:w-[70%] lg:w-[50%] md:mx-auto pt-[120px]">
      <div>
        <h2 className="text-second-black text-2xl md:text-3xl text-center font-semibold">
          Create your Al Nasr account
        </h2>
        <div className="flex justify-center gap-[5px] text-sm mt-[10px]">
          <p className="text-second-black">Already have an account?</p>
          <Link
            to="/alnasr/menu/login"
            className="text-second-black underline font-semibold"
          >
            Log in
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit} ref={form} className="my-[50px]" action="">
        <div className="flex flex-col">
          <label className="text-second-black text-sm" htmlFor="user-email">
            First, enter your email address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="mt-[10px] rounded-[5px] p-[8px] border-2 border-second-black hover:border-[#000] duration-500 ease-in-out outline-[#000]"
            type="email"
            name="user-email"
            id="user-email"
            placeholder="Your email"
            disabled={showRegisterButton}
          />
        </div>
        {showSendverificationCodeButton ? (
          <button
            onClick={handleSendVerificationCode}
            className="mt-4 w-full p-3 text-second-black hover:text-[#000] font-semibold bg-second-yellow rounded-md hover:bg-main-yellow"
          >
            Send Verification code
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
              Verify Code
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
              <div className="mr-2">Registering...</div>
              <div className="loader"></div>
            </div>
          ) : (
            "Register"
          )}
        </button>
      </form>

      <div className="flex flex-col mb-[20px]">
        <Link
          to="/alnasr/menu/registerasadmin"
          className="text-[#000] font-semibold underline"
        >
          Register as admin?
        </Link>
      </div>
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
