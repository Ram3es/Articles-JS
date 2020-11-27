import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import common_ru from "./translations/ru/common.json";
import common_en from "./translations/en/common.json";

const resources = {
  en: {
    translations: common_en,
  },
  ru: {
    translations: common_ru,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "us",
    ns: ["translations"],
    defaultNS: "translations",
    fallbackLng: "ru",
    // debug: true,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
