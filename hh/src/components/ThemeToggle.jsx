import React from "react"
import { FiSun, FiMoon } from "react-icons/fi"
import { useTheme } from "../context/useTheme"

export const ThemeToggle = ({ className = "", showLabel = false }) => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isDark ? "Переключить на светлую тему" : "Переключить на тёмную тему"}
      aria-label={isDark ? "Светлая тема" : "Тёмная тема"}
      className={`group relative flex items-center justify-center gap-2 rounded-xl border p-2 text-sm font-medium transition duration-200 active:scale-95 ${
        isDark
          ? "border-slate-700 bg-slate-800 text-amber-400 hover:border-amber-400/50 hover:bg-slate-750"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
      } shadow-xs ${className}`}
    >
      <div className="relative flex h-5 w-5 items-center justify-center">
        {isDark ? (
          <FiSun className="h-4.5 w-4.5 transition-transform duration-300 rotate-0 group-hover:rotate-45" />
        ) : (
          <FiMoon className="h-4.5 w-4.5 transition-transform duration-300 rotate-0 group-hover:-rotate-12 text-slate-600" />
        )}
      </div>
      {showLabel && (
        <span className="text-xs font-semibold select-none">
          {isDark ? "Светлая" : "Тёмная"}
        </span>
      )}
    </button>
  )
}

export default ThemeToggle
