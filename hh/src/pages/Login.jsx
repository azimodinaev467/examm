import { useState } from "react"
import { useNavigate } from "react-router"
import { useTranslation } from "react-i18next"
import { LoginRequest } from "../api/auth"
import ThemeToggle from "../components/ThemeToggle"
import LanguageToggle from "../components/LanguageToggle"
import { FiEye, FiEyeOff, FiX } from "react-icons/fi"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"

const Login = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const token = await LoginRequest({ email, password })

      if (!token) {
        setError(t("login.invalidError"))
        return
      }

      navigate("/", { replace: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-200/60 p-4 transition-colors duration-200 dark:bg-slate-950">
      <div className="absolute right-4 top-4 flex items-center gap-2 sm:right-8 sm:top-8">
        <LanguageToggle />
        <ThemeToggle showLabel />
      </div>

      <div className="relative w-full max-w-sm rounded-2xl bg-white px-8 pb-8 pt-6 shadow-lg transition-colors duration-200 dark:bg-slate-900">
        <button
          type="button"
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          onClick={() => navigate(-1)}
        >
          <FiX className="h-4 w-4" />
        </button>

        <div className="mb-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("login")}
            className={`text-lg font-semibold transition ${
              activeTab === "login"
                ? "text-green-600"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            }`}
          >
            {t("login.title") || "Login"}
          </button>
          <span className="text-slate-300 dark:text-slate-600 select-none">|</span>
          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className={`text-lg font-semibold transition ${
              activeTab === "register"
                ? "text-green-600"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            }`}
          >
            {t("login.register") || "Register"}
          </button>
        </div>

        <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">
          {t("login.subtitle") || "Enter your username and password to login."}
        </p>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-green-500"
            type="email"
            placeholder={t("login.emailPlaceholder") || "almamun_uxui@outlook.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 pr-11 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-green-500"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? (
                <FiEyeOff className="h-4.5 w-4.5" />
              ) : (
                <FiEye className="h-4.5 w-4.5" />
              )}
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs font-medium text-green-600 hover:underline dark:text-green-400"
            >
              {t("login.forgotPassword") || "Forgot Password?"}
            </button>
          </div>

          <button
            className="mt-1 w-full rounded-lg bg-green-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 active:scale-95 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? (t("login.loading") || "Loading...") : (t("login.submit") || "Login")}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {t("login.orWith") || "Or login with"}
          </span>
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        </div>

        <div className="space-y-3">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-750"
          >
            <FcGoogle className="h-5 w-5" />
            {t("login.googleLogin") || "Login with Google"}
          </button>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-750"
          >
            <FaFacebook className="h-5 w-5 text-[#1877F2]" />
            {t("login.facebookLogin") || "Login with Facebook"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login