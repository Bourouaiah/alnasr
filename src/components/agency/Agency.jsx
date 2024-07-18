import landingTwo from "../../assets/landing-two.png";

function Agency() {
  return (
    <section className="px-[20px] md:px-[50px] py-[50px] flex flex-wrap md:flex-nowrap gap-[50px] lg:gap-[20px] items-center bg-[#F3FFFE]">
      <div className="w-full md:w-[50%] mx-auto">
        <img className="w-[100%] lg:w-[80%]" src={landingTwo} alt="" />
      </div>
      <div className="w-full md:w-[50%]">
        <h1 className="text-center md:text-left text-[30px] lg:text-[54px] font-semibold">
          A Wonderful Agency To Fulfill your Dreams
        </h1>
        <p className="text-center md:text-left text-[15px] lg:text-[18px] my-[40px]">
          The Hajj and Umrah pilgrimages are smooth, the heart is clean. we have
          been trusted since 2024 and have obtained a license from SAUDI ARABIA
          to become this travel agency.
        </p>
        <div className="flex justify-center md:items-start gap-[20px]">
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
