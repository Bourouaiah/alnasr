import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../firebase";
import toast, { Toaster } from "react-hot-toast";

function ServicesAccommodation() {
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
        addDoc(collection(db, "accommodations"), {
          type,
          location,
          mapLocation,
          link,
        }).then(() => {
          setType("");
          setLocation("");
          setMapLocation("");
          setLink("");
        })
        .then(() => {
          toast.success("Service was added!");
        })
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
          placeholder="eg: Hotel"
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
          placeholder="eg: The Clock Towers"
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
          placeholder="eg: https://www.google.com/maps/place/The+Clock+Towers/@21.4196711,39.8199433,17z/data=!4m13!1m2!2m1!1sabraj+al+bait+mecca+saudi+arabia!3m9!1s0x15c204c82533f16f:0xca0cff6480eeca59!5m2!4m1!1i2!8m2!3d21.4196711!4d39.8244494!15sCiBhYnJhaiBhbCBiYWl0IG1lY2NhIHNhdWRpIGFyYWJpYVoiIiBhYnJhaiBhbCBiYWl0IG1lY2NhIHNhdWRpIGFyYWJpYZIBBWhvdGVs4AEA!16zL20vMDloNjE5?entry=ttu"
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
          placeholder="eg: https://www.kayak.com/"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <button
      onClick={handleSumbit}
        className="w-full bg-second-yellow text-second-black hover:text-[#000] mt-[20px] p-[10px] rounded-lg font-semibold hover:bg-main-yellow duration-300 ease-in-out"
      >
        Add Accommodation
      </button>
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  )
}

export default ServicesAccommodation