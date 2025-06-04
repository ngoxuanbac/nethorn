"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { type Language, type Translations, getTranslation } from "@/lib/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
  availableLanguages: Array<{ code: Language; name: string; flag: string }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const availableLanguages = [
  { code: "vi" as Language, name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("vi");

  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("voice-chat-language", newLanguage);
    }
  }, []);

  // Load language from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem(
        "voice-chat-language"
      ) as Language;
      if (
        savedLanguage &&
        availableLanguages.find((lang) => lang.code === savedLanguage)
      ) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  const t = getTranslation(language);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
