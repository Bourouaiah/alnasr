import { useCallback, useEffect, useMemo, useState } from "react";

import toast, { Toaster } from "react-hot-toast";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";

import Select from "react-select";
import countryList from "react-select-country-list";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { useDropzone } from "react-dropzone";

import userCollectImg from "../../assets/user-collect-img.png";

function generateuserId() {
  return Math.floor(1000000000000000 + Math.random() * 9000000000000000);
}

function UserCollectData() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email } = state;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [gender, setGender] = useState(null);
  const [userEmail, setUserEmail] = useState(email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [age, setAge] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
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
    setLatitude(latitude);
    setLongitude(longitude);
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setCountry(value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePicture(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleAgeChange = (e) => {
    const value = e.target.value;

    // Check if the value is a number and within the desired range
    if ((/^\d*$/.test(value) && value <= 120) || value === "") {
      setAge(value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      toast.error("Plase confirm your password");
    } else if (
      firstName === "" ||
      lastName === "" ||
      profilePicture == null ||
      gender === "" ||
      age === "" ||
      email === "" ||
      password === "" ||
      phoneNumber === "" ||
      country === "" ||
      city === "" ||
      town === "" ||
      latitude === "" ||
      longitude === ""
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
        await setDoc(userRef, {
          id: userId,
          role: "user",
          firstName,
          lastName,
          profilePicture,
          gender,
          age,
          email,
          phoneNumber,
          country,
          city,
          town,
          latitude,
          longitude,
        });
        toast.success("User created successfully!", { id: loadingToastId });

        navigate("/alnasr/menu/login");
      } catch (error) {
        toast.error("Failed to create user!");
        console.error("Error updating document: ", error);
      }
    }
  };

  return (
    <section className="pt-[90px]">
      <h1 className="text-center text-lg sm:text-xl lg:text-2xl my-[40px] text-second-black font-semibold">
        Enter the required data please!
      </h1>
      <div className="flex flex-wrap lg:flex-nowrap m-[30px] my-[30px] md:mx-[30px] gap-[50px] border border-second-black rounded-lg overflow-hidden">
        <div className="hidden lg:block w-[45%]">
          <img src={userCollectImg} alt="" />
        </div>
        <div className="w-full lg:w-[55%] p-[20px] py-[50px] lg:pr-[50px]">
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
            <div {...getRootProps()} className="flex flex-col gap-[10px]">
              <label
                className="font-semibold text-second-black"
                htmlFor="profile-picture"
              >
                Profile Picture
              </label>
              <div className="flex items-center justify-between border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md">
                <input
                  className="flex-1 w-full gap-[2px] cursor-pointer outline-none"
                  type="text"
                  name="profile-picture"
                  id="profile-picture"
                  placeholder="select an image please"
                  value={profilePicture}
                />
                <MdAddPhotoAlternate className="text-lg text-second-black cursor-pointer" />
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <label
                className="font-semibold text-second-black"
                htmlFor="gender"
              >
                Gender
              </label>
              <Select
                className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[1px] rounded-md"
                defaultValue={gender}
                onChange={setGender}
                options={genderOptions}
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <label
                className="font-semibold text-second-black"
                htmlFor="card-id"
              >
                Your Age
              </label>
              <input
                className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
                placeholder="eg: 27"
                type="number"
                name="age"
                id="age"
                value={age}
                onChange={handleAgeChange}
                maxLength={3}
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
                htmlFor="user-password"
              >
                Confirm password
              </label>
              <div className="flex items-center justify-between rounded-md p-[8px] border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-main-blue">
                <input
                  className="outline-none border-none w-[75%]"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={`${showPassword ? "text" : "password"}`}
                  name="user-password"
                  id="user-password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
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
                Latitude
              </label>
              <input
                className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
                type="text"
                name="latitude"
                id="latitude"
                placeholder="Click on get my location button"
                value={latitude}
                disabled
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <label
                className="font-semibold text-second-black"
                htmlFor="card-id"
              >
                Longitude
              </label>
              <input
                className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
                type="text"
                name="longitude"
                id="longitude"
                placeholder="Click on get my location button"
                value={longitude}
                disabled
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

      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
}

export default UserCollectData;
