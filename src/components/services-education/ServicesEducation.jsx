
function ServicesEducation() {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-[20px]" action="">
      <div className="flex flex-col gap-[10px]">
        <label className="font-semibold text-second-black" htmlFor="first-name">
          Type of education
        </label>
        <input
          className="border-2 border-second-black hover:border-second-gray duration-500 ease-in-out outline-second-black p-[8px] rounded-md"
          type="text"
          name="first-name"
          id="first-name"
          placeholder="eg: Ummul Al Qura University - Makkah"
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
          placeholder="eg: Ar Rusayfah, Makkah 24232, Saudi Arabia"
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
          placeholder="eg: https://www.google.com/maps/place/Ummul+Al+Qura+University+-+Makkah/@21.3858557,39.62882,11z/data=!4m10!1m2!2m1!1suniversity+in+mecca!3m6!1s0x15c20975dee1607d:0x8dadfc8b850f9241!8m2!3d21.3299695!4d39.952206!15sChN1bml2ZXJzaXR5IGluIG1lY2NhWhUiE3VuaXZlcnNpdHkgaW4gbWVjY2GSAQp1bml2ZXJzaXR5mgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU5QYURkWVpUVm5SUkFC4AEA!16zL20vMDZqY3l3?entry=ttu"
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
          placeholder="eg: https://uqu.edu.sa/"
          maxLength={15}
        />
      </div>
      <button
        className="w-full bg-second-yellow text-second-black hover:text-[#000] mt-[20px] p-[10px] rounded-lg font-semibold hover:bg-main-yellow duration-300 ease-in-out"
      >
        Add Education Service
      </button>
    </form>
  )
}

export default ServicesEducation