import React from "react"
import { useTranslation } from "react-i18next"
import { FiGlobe } from "react-icons/fi"

export const LanguageToggle = ({ className = "" }) => {
  const { i18n } = useTranslation()
  const currentLang = i18n.language?.startsWith("en") ? "en" : "ru"

  const toggleLanguage = () => {
    const nextLang = currentLang === "ru" ? "en" : "ru"
    i18n.changeLanguage(nextLang)
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      title={currentLang === "ru" ? "Switch to English" : "Переключить на русский"}
      aria-label="Переключение языка / Change language"
      className={`group relative flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 shadow-xs transition duration-200 hover:border-slate-300 hover:bg-slate-50 active:scale-95 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-750 dark:hover:text-white ${className}`}
    >
      <FiGlobe className="h-4 w-4 text-slate-400 transition-transform group-hover:rotate-12 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
      <span className="uppercase tracking-wide">{currentLang === "ru" ? "RU" : "EN"}</span>
    </button>
  )
}

export default LanguageToggle

