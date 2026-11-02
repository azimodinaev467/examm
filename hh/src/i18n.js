import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import rus from "./rus/rus.json"
import eng from "./eng/eng.json"

const savedLanguage = localStorage.getItem("language") || "ru"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translation: rus,
      },
      en: {
        translation: eng,
      },
    },
    lng: savedLanguage,
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
  })

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng)
})

export default i18n

