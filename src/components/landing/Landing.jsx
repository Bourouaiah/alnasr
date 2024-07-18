import landingOne from "../../assets/landing-one.png";

function Landing() {
  return (
    <section className="px-[20px] md:px-[50px] py-[50px] gap-[50px] lg:gap-[20px] flex flex-wrap md:flex-nowrap items-center">
      <div className="w-full md:w-[50%] md:block flex flex-col">
        <h1 className="text-center md:text-left text-[30px] lg:text-[54px] font-semibold">Make it easy for your Hajj worship with Al Nasr Travel</h1>
        <p className="text-center md:text-left text-[15px] lg:text-[18px] my-[40px]">
          Facilitate your Hajj pilgrimage with us, we already have hundreds of
          thousands of customers, you can go for Umrah to Mecca and Medina.
        </p>
        <button className="mx-auto bg-main-yellow py-[10px] px-[20px] font-medium rounded-2xl text-second-black border border-main-yellow hover:text-main-yellow hover:bg-second-black duration-200">
          Join now
        </button>
      </div>
      <div className="w-full md:w-[50%]">
        <img className="w-[100%] lg:w-[80%]" src={landingOne} alt="" />
      </div>
    </section>
  );
}

export default Landing;
