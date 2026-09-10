import React, { createContext, useContext, useState } from "react";
import { translations } from "../data/i18n";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // "en" | "hi"

  const toggleLanguage = () => {
    setLanguage((prev) => {
      if (prev === "en") return "hi";
      if (prev === "hi") return "mr";
      return "en";
    });
  };

  const t = (key, fallback = "") => {
    if (translations[language] && translations[language][key] !== undefined) {
      return translations[language][key];
    }
    if (translations["en"] && translations["en"][key] !== undefined) {
      return translations["en"][key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
