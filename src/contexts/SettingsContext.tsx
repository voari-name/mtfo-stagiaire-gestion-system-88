
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsContextType {
  darkMode: boolean;
  standbyMode: boolean;
  brightness: number[];
  language: string;
  translations: Record<string, string>;
  setDarkMode: (value: boolean) => void;
  setStandbyMode: (value: boolean) => void;
  setBrightness: (value: number[]) => void;
  setLanguage: (value: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const translationsData = {
  fr: {
    "Mon profil": "Mon profil",
    "Profil": "Profil",
    "Gestion des stages": "Gestion des stages",
    "Stagiaires": "Stagiaires",
    "Évaluations": "Évaluations",
    "Attestations": "Attestations",
    "Projets": "Projets",
    "Statistiques": "Statistiques",
    "Paramètres": "Paramètres",
    "Déconnexion": "Déconnexion",
    "Préférences d'affichage": "Préférences d'affichage",
    "Mode sombre": "Mode sombre",
    "Mode veille": "Mode veille",
    "Luminosité": "Luminosité",
    "Langue de l'application": "Langue de l'application"
  },
  en: {
    "Mon profil": "My Profile",
    "Profil": "Profile",
    "Gestion des stages": "Internship Management",
    "Stagiaires": "Interns",
    "Évaluations": "Evaluations",
    "Attestations": "Certificates",
    "Projets": "Projects",
    "Statistiques": "Statistics",
    "Paramètres": "Settings",
    "Déconnexion": "Logout",
    "Préférences d'affichage": "Display Preferences",
    "Mode sombre": "Dark Mode",
    "Mode veille": "Standby Mode",
    "Luminosité": "Brightness",
    "Langue de l'application": "Application Language"
  },
  mg: {
    "Mon profil": "Ny mombamomba ahy",
    "Profil": "Mombamomba",
    "Gestion des stages": "Fitantanana ny fampianarana",
    "Stagiaires": "Mpianatra",
    "Évaluations": "Fanombanana",
    "Attestations": "Porofo",
    "Projets": "Tetikasa",
    "Statistiques": "Antontan'isa",
    "Paramètres": "Fandrindrana",
    "Déconnexion": "Fivoahana",
    "Préférences d'affichage": "Safidin'ny fampisehoana",
    "Mode sombre": "Maizina",
    "Mode veille": "Fiandrasana",
    "Luminosité": "Fahazavana",
    "Langue de l'application": "Fitenin'ny rindranasa"
  }
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [standbyMode, setStandbyMode] = useState(false);
  const [brightness, setBrightness] = useState([80]);
  const [language, setLanguage] = useState('fr');

  const translations = translationsData[language as keyof typeof translationsData] || translationsData.fr;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.style.filter = `brightness(${brightness[0]}%)`;
  }, [brightness]);

  const value = {
    darkMode,
    standbyMode,
    brightness,
    language,
    translations,
    setDarkMode,
    setStandbyMode,
    setBrightness,
    setLanguage,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
