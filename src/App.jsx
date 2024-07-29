import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Agency from "./components/agency/Agency";
import LandingPage from "./components/landing/Landing";
import Services from "./pages/Services";
import Sidebar from "./components/SideBar";
import Gallery from "./components/gallery/Gallery";

const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem("language");
  return savedLanguage || "en";
};

function App() {
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
      <LandingPage />
      <Agency />
      <Services />
      <Gallery />
    </>
  );
}

export default App;
