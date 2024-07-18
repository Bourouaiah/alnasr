import logo from "../assets/logo.png";

function NavBar() {
  return (
    <nav className="nav-shadow flex items-center justify-between py-[20px] px-[100px]">
      <div>
        <img className="w-[90px]" src={logo} alt="logo" />
      </div>
      <ul className="flex items-center gap-[25px]">
        <li className="hover:text-main-yellow hover:border-b cursor-pointer font-medium text-second-black">
          Home
        </li>
        <li className="hover:text-main-yellow hover:border-b cursor-pointer font-medium text-second-black">
          About Us
        </li>
        <li className="hover:text-main-yellow hover:border-b cursor-pointer font-medium text-second-black">
          Services
        </li>
        <li className="hover:text-main-yellow hover:border-b cursor-pointer font-medium text-second-black">
          Testimonials
        </li>
        <li className="hover:text-main-yellow hover:border-b cursor-pointer font-medium text-second-black">
          Gallery
        </li>
      </ul>
      <div>
        <button className="bg-main-yellow py-[10px] px-[20px] font-medium rounded-2xl text-second-black border border-main-yellow hover:text-main-yellow hover:bg-second-black duration-200">
          Join now
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
