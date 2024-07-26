import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../../firebase";

function ServicesHealth() {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [mapLocation, setMapLocation] = useState("");
  const [link, setLink] = useState("");

  const handleSumbit = (e) => {
    e.preventDefault();
    if (type == "" || location == "" || mapLocation == "" || link == "") {
      toast.error("Plase fill all the data!");
    } else {
      try {
        addDoc(collection(db, "helath"), {
          type,
          location,
          mapLocation,
          link,
        })
          .then(() => {
            setType("");
            setLocation("");
            setMapLocation("");
            setLink("");
          })
          .then(() => {
            toast.success("Service was added!");
          });
      } catch (err) {
        toast.error(err);
      }
    }
  };
  
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-[20px]" action="">
      <div className="flex flex-col gap-[10px]">
        <label className="font-semibold text-second-black" htmlFor="first-name">
          Type of accommodation
        </label>
        <input
          className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
          type="text"
          name="first-name"
          id="first-name"
          placeholder="eg: Dentist"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <label className="font-semibold text-second-black" htmlFor="first-name">
          Location
        </label>
        <input
          className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
          type="text"
          name="first-name"
          id="first-name"
          placeholder="eg: 3536 Old Makkah Jeddah Rd, Al Diyafah, Makkah 24221, Saudi Arabia"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <label className="font-semibold text-second-black" htmlFor="first-name">
          Location in google map
        </label>
        <input
          className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
          type="text"
          name="first-name"
          id="first-name"
          placeholder="eg: https://www.google.com/maps/place/Al+Balkhi+Dental+Clinic/@21.4353971,39.7678791,14z/data=!4m10!1m2!2m1!1sdentiste+in+mecca!3m6!1s0x15c21b452c00f8a1:0x27c9a82ba61995e1!8m2!3d21.4353971!4d39.803928!15sChFkZW50aXN0ZSBpbiBtZWNjYZIBB2RlbnRpc3TgAQA!16s%2Fg%2F11cn9664wb?entry=ttu"
          value={mapLocation}
          onChange={(e) => setMapLocation(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <label className="font-semibold text-second-black" htmlFor="first-name">
          Website or App Link
        </label>
        <input
          className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
          type="text"
          name="first-name"
          id="first-name"
          placeholder="eg: https://www.website.com/"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <button
        onClick={handleSumbit}
        className="w-full bg-second-yellow text-second-black hover:text-[#000] mt-[20px] p-[10px] rounded-lg font-semibold hover:bg-main-yellow duration-300 ease-in-out"
      >
        Add Health Service
      </button>
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

export default ServicesHealth;
