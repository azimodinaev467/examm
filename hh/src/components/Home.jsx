// import { Link } from "react-router"
// import { useTranslation } from "react-i18next"
// import { FiUsers, FiBox, FiLogOut } from "react-icons/fi"
// import ThemeToggle from "../components/ThemeToggle"
// import LanguageToggle from "../components/LanguageToggle"

// const Home = () => {
//   const { t } = useTranslation()

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 transition-colors duration-200 sm:p-8 dark:bg-slate-950">
//       <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-colors duration-200 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
//               {t("home.title")}
//             </h1>
//             <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
//               {t("home.subtitle")}
//             </p>
//           </div>
//           <div className="flex items-center gap-2 self-start sm:self-auto">
//             <LanguageToggle />
//             <ThemeToggle showLabel />
//           </div>
//         </div>

//         <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <Link
//             to="/users"
//             className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-5 transition hover:border-blue-500/40 hover:bg-blue-50/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-blue-500/40 dark:hover:bg-slate-800"
//           >
//             <div className="flex items-center gap-3">
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
//                 <FiUsers className="h-5 w-5" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-slate-900 dark:text-white">
//                   {t("home.usersTitle")}
//                 </h3>
//                 <p className="text-xs text-slate-500 dark:text-slate-400">
//                   {t("home.usersSubtitle")}
//                 </p>
//               </div>
//             </div>
//             <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
//               {t("home.goTo")} &rarr;
//             </span>
//           </Link>

//           <Link
//             to="/products"
//             className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-5 transition hover:border-indigo-500/40 hover:bg-indigo-50/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-indigo-500/40 dark:hover:bg-slate-800"
//           >
//             <div className="flex items-center gap-3">
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
//                 <FiBox className="h-5 w-5" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-slate-900 dark:text-white">
//                   {t("home.productsTitle")}
//                 </h3>
//                 <p className="text-xs text-slate-500 dark:text-slate-400">
//                   {t("home.productsSubtitle")}
//                 </p>
//               </div>
//             </div>
//             <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
//               {t("home.goTo")} &rarr;
//             </span>
//           </Link>
//         </div>

//         <div className="mt-8 flex justify-end border-t border-slate-100 pt-6 dark:border-slate-800">
//           <button
//             onClick={() => {
//               localStorage.removeItem("token")
//               window.location.href = "/login"
//             }}
//             className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-95"
//           >
//             <FiLogOut className="h-4 w-4" />
//             <span>{t("common.logout")}</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Home
