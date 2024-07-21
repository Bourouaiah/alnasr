import { Outlet } from "react-router-dom";
import NavBar from "./navbar/NavBar";
import Sidebar from "./sidebar/SideBar";
import Footer from "./footer/Footer";

function NewUserLayout() {
  return (
    <>
      <NavBar />
      <Sidebar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default NewUserLayout;
