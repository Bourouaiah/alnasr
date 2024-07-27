import toast, { Toaster } from "react-hot-toast";
import useFetchUsers from "../../../custom-hooks/useFetchUsers";
import { useCallback, useMemo, useState } from "react";
import countryList from "react-select-country-list";
import { useDropzone } from "react-dropzone";

import Select from "react-select";

import PhoneInput from "react-phone-number-input";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

function Settings() {
  const { userDoc } = useFetchUsers();
  const [firstName, setFirstName] = useState(userDoc?.firstName || "");
  const [lastName, setLastName] = useState(userDoc?.lastName || "");
  const [profilePicture, setProfilePicture] = useState(
    userDoc?.profilePicture || null
  );
  const [gender, setGender] = useState(userDoc?.gender || null);
  const [email, setEmail] = useState(userDoc?.email || "");
  const [country, setCountry] = useState(userDoc?.country || "");
  const [phoneNumber, setPhoneNumber] = useState(userDoc?.phoneNumber || "");
  const [age, setAge] = useState(userDoc?.age || "");
  const [latitude, setLatitude] = useState(userDoc?.latitude || "");
  const [longitude, setLongitude] = useState(userDoc?.longitude || "");
  const [city, setCity] = useState(userDoc?.city || "");
  const [town, setTown] = useState(userDoc?.town || "");

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
    if (
      firstName === "" ||
      lastName === "" ||
      profilePicture == null ||
      gender === "" ||
      age === "" ||
      email === "" ||
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
        const userRef = doc(db, "users", userDoc?.id);
        await updateDoc(userRef, {
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
        toast.success("Data updated successfully!", { id: loadingToastId });
      } catch (error) {
        toast.error("Failed to create user!");
        console.error("Error updating document: ", error);
      }
    }
  };

  return (
    <section className="ml-[100px] lg:ml-[20%] p-[15px] md:p-[30px] min-h-[85vh] text-sm md:text-base">
      {userDoc?.role == "user" ? (
        <>
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
                value={email}
                disabled
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
          <Toaster position="top-center" reverseOrder={false} />
        </>
      ) : (
        <p>This page is for normal users!</p>
      )}
    </section>
  );
}

export default Settings;
