import landingTwo from "../assets/landing-two.png";

function Agency() {
  return (
    <section className="px-[100px] py-[50px] flex items-center bg-[#F3FFFE]">
      <div className="w-[50%]">
        <img className="w-[90%]" src={landingTwo} alt="" />
      </div>
      <div className="w-[50%]">
        <h1 className="text-[54px] font-semibold">
          A Wonderful Agency To Fulfill your Dreams
        </h1>
        <p className="text-[18px] my-[40px]">
          The Hajj and Umrah pilgrimages are smooth, the heart is clean. we have
          been trusted since 2024 and have obtained a license from SAUDI ARABIA
          to become this travel agency.
        </p>
        <div className="flex gap-[10px]">
          <button className="bg-main-yellow py-[10px] px-[20px] font-medium rounded-2xl text-second-black border border-main-yellow hover:text-main-yellow hover:bg-second-black duration-200">
            Join now
          </button>
          <button className="bg-[#F3FFFE] py-[10px] px-[20px] font-medium rounded-2xl text-main-yellow border border-main-yellow hover:text-main-yellow hover:bg-second-black duration-200">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

export default Agency;
