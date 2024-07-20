import { useEffect, useMemo, useState } from "react";
// import chipCard from "../../assets/overview/chip-card.png";
// import chipCardBlack from "../../assets/overview/chip-card-black.png";
// import algeriePost from "../../assets/overview/algerie-poste.svg";
import toast, { Toaster } from "react-hot-toast";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import Select from "react-select";
import countryList from "react-select-country-list";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { fromLatLng } from "react-geocode";

// import { setDoc, doc } from "firebase/firestore";
// import { auth, db } from "../../firebase";
import { useLocation, useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { sha256 } from "js-sha256";

import userCollectImg from "../../assets/user-collect-img.png";

function generatePassKey() {
  return Math.floor(1000 + Math.random() * 9000);
}

function generateuserId() {
  return Math.floor(1000000000000000 + Math.random() * 9000000000000000);
}

function UserCollectData() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email, role } = state;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState(email);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [userId, setUserId] = useState("");
  const [passKey, setPassKey] = useState(generatePassKey());
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");

  function handleLocationClick(e) {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    fromLatLng(latitude, longitude).then(({ results }) => {
      const { lat, lng } = results[0].geometry.location;
      console.log(lat, lng);
      console.log(results[0].geometry.location);
    });
  }

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setCountry(value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setUserId(generateuserId());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      passKey === "" ||
      userId === ""
    ) {
      toast.error("Please enter all the required data correctly!");
    } else {
      try {
        const loadingToastId = toast.loading("Submitting...");
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          userEmail,
          password
        );
        const user = userCredential.user;
        const userId = user.uid;

        const userRef = doc(db, "users", userId);
        if (role == "user" || role == "cashier") {
          await setDoc(userRef, {
            id: userId,
            role,
            firstName,
            lastName,
            email,
            userId,
            passKey,
            balance: 0,
            income: 0,
            expense: 0,
            transactions: [],
            isCardVerified: false,
          });
        } else {
          await setDoc(userRef, {
            id: userId,
            role,
            firstName,
            lastName,
            email,
            password,
            userId,
          });
        }
        toast.success("User created successfully!", { id: loadingToastId });

        navigate("/payper/home");
      } catch (error) {
        toast.error("Failed to create user!", { id: loadingToastId });
        console.error("Error updating document: ", error);
      }
    }
  };

  return (
    <section>
      <h1 className="text-center text-lg sm:text-xl lg:text-2xl my-[40px] text-second-black font-semibold">
        Enter the required data please!
      </h1>
      {role == "user" ? (
        <div className="flex flex-wrap lg:flex-nowrap my-[30px] md:mx-[30px] gap-[50px] border border-second-black rounded-lg overflow-hidden">
          <div className="w-[40%]">
            <img src={userCollectImg} alt="" />
          </div>
          <div className="w-[60%] py-[50px] pr-[50px]">
            <form
              className="grid grid-cols-1 sm:grid-cols-2 text-sm md:text-base w-full justify-center gap-[20px] lg:w-auto"
              action=""
            >
              <div className="flex flex-col gap-[10px]">
                <label
                  className="font-semibold text-second-black"
                  htmlFor="first-name"
                >
                  First Name
                </label>
                <input
                  className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="eg: Abdelaziz"
                  maxLength={15}
                />
              </div>
              <div className="flex flex-col gap-[10px]">
                <label
                  className="font-semibold text-second-black"
                  htmlFor="last-name"
                >
                  Last Name
                </label>
                <input
                  className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="eg: Bourouaiah"
                  maxLength={15}
                />
              </div>
              <div className="flex flex-col gap-[10px]">
                <label
                  className="font-semibold text-second-black"
                  htmlFor="user-email"
                >
                  Email
                </label>
                <input
                  className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
                  type="email"
                  name="user-email"
                  id="user-email"
                  value={userEmail}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-[10px]">
                <label
                  className="font-semibold text-second-black"
                  htmlFor="user-password"
                >
                  Your password
                </label>
                <div className="flex items-center justify-between rounded-md p-[8px] border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-main-blue">
                  <input
                    className="outline-none border-none w-[75%]"
                    onChange={(e) => setPassword(e.target.value)}
                    type={`${showPassword ? "text" : "password"}`}
                    name="user-password"
                    id="user-password"
                    placeholder="Your Password"
                    value={password}
                  />
                  <div
                    onClick={handleTogglePassword}
                    className="text-second-gray cursor-pointer"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[10px]">
                <label
                  className="font-semibold text-second-black"
                  htmlFor="first-name"
                >
                  Your country
                </label>
                <Select
                  className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[1px] rounded-md"
                  options={options}
                  value={country}
                  onChange={changeHandler}
                />
              </div>
              <div className="flex flex-col gap-[10px]">
                <label
                  className="font-semibold text-second-black"
                  htmlFor="first-name"
                >
                  Your phone number
                </label>
                <PhoneInput
                  className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                />
              </div>
              <div className="flex flex-col gap-[10px]">
                <label
                  className="font-semibold text-second-black"
                  htmlFor="first-name"
                >
                  Your city
                </label>
                <input
                  className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="eg: Alger"
                  maxLength={15}
                />
              </div>
              <div className="flex flex-col gap-[10px]">
                <label
                  className="font-semibold text-second-black"
                  htmlFor="first-name"
                >
                  Your town
                </label>
                <input
                  className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  placeholder="eg: Douera"
                  maxLength={15}
                />
              </div>
              <div className="flex flex-col gap-[10px]">
                <label
                  className="font-semibold text-second-black"
                  htmlFor="card-id"
                >
                  User Id
                </label>
                <input
                  className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
                  type="text"
                  name="card-id"
                  id="card-id"
                  value={userId}
                  disabled
                  maxLength={16}
                />
              </div>
              <div className="flex flex-col gap-[10px]">
                <label
                  className="font-semibold text-second-black"
                  htmlFor="card-id"
                >
                  Pass key (remember it)
                </label>
                <input
                  className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
                  type="text"
                  name="pass-key"
                  id="pass-key"
                  value={passKey}
                  disabled
                  maxLength={4}
                />
              </div>
              <button
                onClick={handleLocationClick}
                className="w-full bg-second-yellow text-second-black hover:text-[#000] mt-[20px] p-[8px] rounded-2xl font-semibold hover:bg-main-yellow duration-300 ease-in-out"
              >
                Get my location
              </button>
              <button
                onClick={handleSubmit}
                className="w-full bg-second-yellow text-second-black hover:text-[#000] mt-[20px] p-[8px] rounded-2xl font-semibold hover:bg-main-yellow duration-300 ease-in-out"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      ) : null}
      {role == "admin" ? (
        <div className="m-[30px] p-[30px] border border-second-black rounded-lg overflow-hidden">
          <div>
            <form
              className="grid grid-cols-1 sm:grid-cols-2 text-sm md:text-base justify-center gap-[20px] w-[100%] lg:w-auto"
              action=""
            >
              <div className="flex flex-col gap-[10px]">
                <label
                  className="font-semibold text-second-black"
                  htmlFor="first-name"
                >
                  First Name
                </label>
                <input
                  className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="eg: Abdelaziz"
                  maxLength={15}
                />
              </div>
              <div className="flex flex-col gap-[10px]">
                <label
                  className="font-semibold text-second-black"
                  htmlFor="last-name"
                >
                  Last Name
                </label>
                <input
                  className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="eg: Bourouaiah"
                  maxLength={15}
                />
              </div>
              <div className="flex flex-col gap-[10px]">
                <label
                  className="font-semibold text-second-black"
                  htmlFor="user-email"
                >
                  Email
                </label>
                <input
                  className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
                  type="email"
                  name="user-email"
                  id="user-email"
                  value={userEmail}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-[10px]">
                <label
                  className="font-semibold text-second-black"
                  htmlFor="user-password"
                >
                  Your password
                </label>
                <div className="flex justify-between items-center rounded-md p-[8px] border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-main-blue">
                  <input
                    className="outline-none border-none flex-grow"
                    onChange={(e) => setPassword(e.target.value)}
                    type={`${showPassword ? "text" : "password"}`}
                    name="user-password"
                    id="user-password"
                    placeholder="Your Password"
                    value={password}
                  />
                  <div
                    onClick={handleTogglePassword}
                    className="text-second-gray cursor-pointer"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-second-black text-white p-[8px] rounded-2xl font-semibold hover:bg-main-blue duration-300 ease-in-out"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      ) : null}
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
}

export default UserCollectData;
