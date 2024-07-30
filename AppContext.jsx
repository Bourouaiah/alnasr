import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isNavBarShown, setIsNavBarShown] = useState(false);
  const [isMainNavBarShown, setIsMainNavBarShown] = useState(false);
  const [language, setLanguage] = useState(getInitialLanguage());

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <AppContext.Provider
      value={{
        isNavBarShown,
        setIsNavBarShown,
        isMainNavBarShown,
        setIsMainNavBarShown,
        language,
        changeLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

function getInitialLanguage() {
  return localStorage.getItem('language') || 'en';
}
