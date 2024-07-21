import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  const [isNavBarShown, setIsNavBarShown] = useState(false);
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
        language,
        changeLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Helper function to get initial language
function getInitialLanguage() {
  return localStorage.getItem('language') || 'en'; // Default language is 'en'
}
