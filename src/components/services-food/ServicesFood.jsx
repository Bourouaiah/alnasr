

function ServicesFood() {
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
          placeholder="eg: Restaurant"
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
          placeholder="eg: 4061 حي, Al Hajlah, MALA6198، 6198 شارع 21, Makkah 24231, Saudi Arabia"
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
          placeholder="eg: https://www.google.com/maps/place/Zamzam+Restaurant/@21.4379705,39.7400003,12z/data=!4m10!1m2!2m1!1sresturant+in+mecca!3m6!1s0x15c2059d72cc75c5:0x8ebdbe3d71911dc9!8m2!3d21.4129652!4d39.8239761!15sChNyZXN0YXVyYW50IGluIG1lY2NhWhUiE3Jlc3RhdXJhbnQgaW4gbWVjY2GSAQpyZXN0YXVyYW504AEA!16s%2Fg%2F11shfn94_b?entry=ttu"
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
          placeholder="eg: https://www.resturant.com/"
          maxLength={15}
        />
      </div>
      <button
        className="w-full bg-second-yellow text-second-black hover:text-[#000] mt-[20px] p-[10px] rounded-lg font-semibold hover:bg-main-yellow duration-300 ease-in-out"
      >
        Add Food Service
      </button>
    </form>
  )
}

export default ServicesFood