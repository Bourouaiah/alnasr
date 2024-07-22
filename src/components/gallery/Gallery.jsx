import imageOne from "../../assets/image-one.png";
import imageTwo from "../../assets/image-two.png";
import imageThree from "../../assets/image-three.png";
import imageFour from "../../assets/image-four.png";
import imageFive from "../../assets/image-five.png";

function Gallery() {
  return (
    <section id="Gallery" className="px-[20px] md:px-[50px] pt-[50px] bg-[#fff]">
      <h1 className="text-[30px] lg:text-[54px] text-center font-semibold">
        Gallery Footage In Saudi Arabia
      </h1>
      <p className="text-[15px] lg:text-[18px] text-center">
        We provide comfort for our customers, with the various facilities we
        provide that we provide
      </p>
      <div className="flex flex-wrap md:flex-nowrap mt-[50px]">
        <div className="w-full md:w-[50%]">
          <img src={imageOne} alt="image-one" />
        </div>
        <div className="grid grid-cols-2 items-center w-full md:w-[50%]">
          <img src={imageTwo} alt="image" />
          <img src={imageThree} alt="image" />
          <img src={imageFour} alt="image" />
          <img src={imageFive} alt="image" />
        </div>
      </div>
    </section>
  );
}

export default Gallery;
