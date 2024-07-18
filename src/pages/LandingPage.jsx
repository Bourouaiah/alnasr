import landingOne from "../assets/landing-one.png";

function LandingPage() {
  return (
    <section className="px-[100px] py-[50px] flex items-center">
      <div className="w-[50%]">
        <h1 className="text-[54px] font-semibold">Make it easy for your Hajj worship with Al Nasr Travel</h1>
        <p className="text-[18px] my-[40px]">
          Facilitate your Hajj pilgrimage with us, we already have hundreds of
          thousands of customers, you can go for Umrah to Mecca and Medina.
        </p>
        <button className="bg-main-yellow py-[10px] px-[20px] font-medium rounded-2xl text-second-black border border-main-yellow hover:text-main-yellow hover:bg-second-black duration-200">
          Join now
        </button>
      </div>
      <div className="w-[50%]">
        <img className="w-[90%]" src={landingOne} alt="" />
      </div>
    </section>
  );
}

export default LandingPage;
