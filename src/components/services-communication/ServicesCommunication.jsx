import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../../firebase";

function ServicesCommunication() {
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
        addDoc(collection(db, "communications"), {
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
          Type of communication
        </label>
        <input
          className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
          type="text"
          name="first-name"
          id="first-name"
          placeholder="eg: Cell Phone store"
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
          placeholder="eg: Ar Rusayfah, Makkah 24232, Saudi Arabia"
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
          placeholder="eg: https://www.google.com/maps/place/Faisaliah+Telecom/@21.4354745,39.7678791,14z/data=!4m10!1m2!2m1!1stelephone+station+in+mecca!3m6!1s0x15c21b1d9701dd7b:0x839bda0b992799a8!8m2!3d21.4097879!4d39.7892315!15sChp0ZWxlcGhvbmUgc3RhdGlvbiBpbiBtZWNjYVocIhp0ZWxlcGhvbmUgc3RhdGlvbiBpbiBtZWNjYZIBEGNlbGxfcGhvbmVfc3RvcmXgAQA!16s%2Fg%2F11_td5mvm?entry=ttu"
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
          placeholder="eg: https://alfaisaliyahstores.com/"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <button
        onClick={handleSumbit}
        className="w-full bg-second-yellow text-second-black hover:text-[#000] mt-[20px] p-[10px] rounded-lg font-semibold hover:bg-main-yellow duration-300 ease-in-out"
      >
        Add Communication Service
      </button>
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

export default ServicesCommunication;
