import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./navbar/NavBar";
import Sidebar from "./sidebar/SideBar";

const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "en";
  };

function NewUserLayout() {
    const [isNavBarShown, setIsNavBarShown] = useState(false);
  const [language, setLanguage] = useState(getInitialLanguage());

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };
  return (
    <>
      <NavBar
        setIsNavBarShown={setIsNavBarShown}
        language={language}
        changeLanguage={changeLanguage}
      />
      <Sidebar
        isNavBarShown={isNavBarShown}
        setIsNavBarShown={setIsNavBarShown}
        language={language}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default NewUserLayout;