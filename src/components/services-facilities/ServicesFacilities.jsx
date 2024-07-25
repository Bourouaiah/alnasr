
function ServicesFacilities() {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-[20px]" action="">
      <div className="flex flex-col gap-[10px]">
        <label className="font-semibold text-second-black" htmlFor="first-name">
          Type of Facility
        </label>
        <input
          className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
          type="text"
          name="first-name"
          id="first-name"
          placeholder="eg: Al Borj Facility"
          maxLength={15}
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
          placeholder="eg: 4207, 6861, Al Haram, Makkah 24231, Saudi Arabia"
          maxLength={15}
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
          placeholder="eg: https://www.google.com/maps/place/Al+Borj+Facility+Management/@21.4376912,39.7400006,12z/data=!4m10!1m2!2m1!1sfacility+in+saudia+arabia!3m6!1s0x15c204b795364d31:0x27e7daac86b44848!8m2!3d21.4191879!4d39.8258428!15sChhmYWNpbGl0eSBpbiBzYXVkaSBhcmFiaWGSARBjb3Jwb3JhdGVfb2ZmaWNl4AEA!16s%2Fg%2F11g6xdlyv0?entry=ttu"
          maxLength={15}
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
          placeholder="eg: http://www.alborj-sa.com/"
          maxLength={15}
        />
      </div>
      <button
        className="w-full bg-second-yellow text-second-black hover:text-[#000] mt-[20px] p-[10px] rounded-lg font-semibold hover:bg-main-yellow duration-300 ease-in-out"
      >
        Add Facility
      </button>
    </form>
  )
}

export default ServicesFacilities