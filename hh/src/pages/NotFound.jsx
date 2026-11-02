import { Link } from "react-router"
import { useTranslation } from "react-i18next"
import ThemeToggle from "../components/ThemeToggle"
import LanguageToggle from "../components/LanguageToggle"

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-slate-100 p-4 text-center transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      <div className="absolute right-4 top-4 flex items-center gap-2 sm:right-8 sm:top-8">
        <LanguageToggle />
        <ThemeToggle showLabel />
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900 sm:p-12">
        <h1 className="text-7xl font-extrabold tracking-tight text-slate-800 dark:text-white">404</h1>
        <p className="mt-3 text-lg font-medium text-slate-600 dark:text-slate-400">
          {t("notFound.title")}
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
        >
          {t("notFound.backHome")}
        </Link>
      </div>
    </div>
  )
}

export default NotFound
