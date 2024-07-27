import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOut, IoNotifications } from "react-icons/io5";
import { auth } from "../../../firebase";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import useFetchUsers from "../../../custom-hooks/useFetchUsers";


function MainNavbar() {
  const navigate = useNavigate();

  const { userDoc } = useFetchUsers();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/alnasr/menu/login", { replace: true });
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  return (
    <nav className="ml-[100px] lg:ml-[20%] nav-shadow flex justify-between gap-[20px] items-center p-[20px]">
      <div>
        <h2 className="text-sm sm:text-lg font-semibold text-[#000]">
          Hello {userDoc?.firstName}
        </h2>
        <p className="text-xs sm:text-sm lg:text-base text-second-black">See what is happening today </p>
      </div>
      <div className="flex items-center gap-[20px] text-second-black text-lg sm:text-xl lg:text-2xl">
        <div>
          <IoNotifications />
        </div>
        <div>
          <FaUserCircle />
        </div>
        <div className="cursor-pointer" onClick={handleSignOut}>
          <IoLogOut />
        </div>
      </div>
    </nav>
  );
}

export default MainNavbar;