// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import { Link } from "react-router"
// import { useTranslation } from "react-i18next"
// import { api } from "../api/auth"
// import ThemeToggle from "../components/ThemeToggle"
// import LanguageToggle from "../components/LanguageToggle"
// import {
//     FiSearch,
//     FiBox,
//     FiUsers,
//     FiLayers,
//     FiArrowLeft,
//     FiChevronLeft,
//     FiChevronRight,
//     FiX,
//     FiRefreshCw,
//     FiSliders,
//     FiShoppingBag,
//     FiCheckCircle,
// } from "react-icons/fi"

// const Products = () => {
//     const { t } = useTranslation()

//     const [data, setData] = useState([])
//     const [search, setSearch] = useState("")
//     const [selectCatalog, setSelectCatalog] = useState("")
//     const [dataCatalog, setDataCatalog] = useState([])
//     const [dataProducts, setDataProducts] = useState([])
//     const [dataProductsTotal, setDataProductsTotal] = useState(0)
//     const [dataProductsLimit, setDataProductsLimit] = useState(8)
//     const [dataProductsTotalPage, setDataProductsTotalPage] = useState(1)
//     const [dataProductsPage, setDataProductsPage] = useState(1)
//     const [loading, setLoading] = useState(false)
//     const [showUsers, setShowUsers] = useState(false)

//     const token = localStorage.getItem("token")

//     const GetUser = async () => {
//         try {
//             const { data } = await axios.get(api + "/users", {
//                 headers: {
//                     Authorization: "Bearer " + token,
//                 },
//             })
//             setData(Array.isArray(data) ? data : [])
//         } catch (error) {
//             console.error("Error fetching users:", error)
//         }
//     }

//     const GetCatalog = async () => {
//         try {
//             const { data } = await axios.get(api + "/catalogs")
//             setDataCatalog(Array.isArray(data) ? data : [])
//         } catch (error) {
//             console.error("Error fetching catalogs:", error)
//         }
//     }

//     const GetProducts = async () => {
//         setLoading(true)
//         try {
//             const queryParams = new URLSearchParams({
//                 limit: dataProductsLimit,
//                 page: dataProductsPage,
//             })
//             if (search.trim()) queryParams.append("search", search.trim())
//             if (selectCatalog) queryParams.append("catalogId", selectCatalog)

//             const { data } = await axios.get(`${api}/products?${queryParams.toString()}`, {
//                 headers: {
//                     Authorization: "Bearer " + token,
//                 },
//             })

//             setDataProducts(data?.data || [])
//             setDataProductsTotal(data?.total || 0)
//             setDataProductsTotalPage(data?.totalPages || 1)
//             setDataProductsLimit(data?.limit || dataProductsLimit)
//         } catch (error) {
//             console.error("Error fetching products:", error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         GetUser()
//         GetCatalog()
//     }, [])

//     useEffect(() => {
//         GetProducts()
//     }, [dataProductsLimit, dataProductsPage, search, selectCatalog])

//     const getCatalogName = (catalogId) => {
//         const found = dataCatalog.find((c) => String(c.id) === String(catalogId))
//         return found ? found.name : t("products.uncategorized")
//     }

//     return (
//         <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
//             <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/80">
//                 <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
//                     <div className="flex items-center gap-4">
//                         <Link
//                             to="/"
//                             className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-700 dark:hover:text-white"
//                         >
//                             <FiArrowLeft className="text-slate-400 transition-transform group-hover:-translate-x-0.5 group-hover:text-slate-700 dark:text-slate-500 dark:group-hover:text-slate-300" />
//                             <span>{t("common.home")}</span>
//                         </Link>

//                         <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />

//                         <div className="flex items-center gap-2.5">
//                             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-500/25">
//                                 <FiBox className="h-5 w-5" />
//                             </div>
//                             <div>
//                                 <h1 className="text-lg font-bold leading-none text-slate-900 dark:text-white">
//                                     {t("products.title")}
//                                 </h1>
//                                 <p className="text-xs text-slate-500 dark:text-slate-400">
//                                     {t("products.subtitle")}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-2 sm:gap-3">
//                         <button
//                             onClick={() => setShowUsers(!showUsers)}
//                             className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${showUsers
//                                     ? "border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-500/50 dark:bg-indigo-950/60 dark:text-indigo-300"
//                                     : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
//                                 }`}
//                         >
//                             <FiUsers className="h-3.5 w-3.5" />
//                             <span className="hidden sm:inline">{t("products.usersBtn")}</span>
//                             <span className="rounded-full bg-slate-200/80 px-1.5 py-0.2 text-[10px] font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
//                                 {data.length}
//                             </span>
//                         </button>

//                         <button
//                             onClick={GetProducts}
//                             title={t("common.refresh")}
//                             className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-indigo-600 active:scale-95 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-indigo-400"
//                         >
//                             <FiRefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-indigo-600 dark:text-indigo-400" : ""}`} />
//                         </button>

//                         <LanguageToggle />
//                         <ThemeToggle />
//                     </div>
//                 </div>
//             </header>

//             <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//                 {showUsers && (
//                     <section className="mb-6 animate-fadeIn rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/70 via-purple-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900">
//                         <div className="mb-3 flex items-center justify-between">
//                             <div className="flex items-center gap-2">
//                                 <div className="rounded-lg bg-indigo-600 p-1.5 text-white">
//                                     <FiUsers className="h-4 w-4" />
//                                 </div>
//                                 <h3 className="font-semibold text-slate-900 dark:text-white">
//                                     {t("products.registeredUsers")} ({data.length})
//                                 </h3>
//                             </div>
//                             <button
//                                 onClick={() => setShowUsers(false)}
//                                 className="rounded-lg p-1 text-slate-400 hover:bg-white/80 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
//                             >
//                                 <FiX className="h-4 w-4" />
//                             </button>
//                         </div>

//                         <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
//                             {data.map((user, idx) => (
//                                 <div
//                                     key={user.id || idx}
//                                     className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-xs transition hover:border-indigo-200 hover:shadow-sm dark:border-slate-800 dark:bg-slate-800/80 dark:hover:border-indigo-500/40"
//                                 >
//                                     <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-200 font-semibold text-indigo-700 text-xs uppercase dark:from-indigo-950 dark:to-indigo-900 dark:text-indigo-300">
//                                         {(user.name || "U").slice(0, 2)}
//                                     </div>
//                                     <div className="min-w-0 flex-1">
//                                         <p className="truncate text-xs font-medium text-slate-900 dark:text-white">
//                                             {user.name || t("products.noName")}
//                                         </p>
//                                         <p className="truncate text-[10px] text-slate-400 dark:text-slate-500">
//                                             {user.email || user.role || "user"}
//                                         </p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </section>
//                 )}

//                 <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
//                     <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900">
//                         <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
//                             <span className="text-xs font-medium">{t("products.totalProducts")}</span>
//                             <FiBox className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
//                         </div>
//                         <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{dataProductsTotal}</p>
//                     </div>

//                     <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900">
//                         <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
//                             <span className="text-xs font-medium">{t("products.categories")}</span>
//                             <FiLayers className="h-4 w-4 text-violet-500 dark:text-violet-400" />
//                         </div>
//                         <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{dataCatalog.length}</p>
//                     </div>

//                     <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900">
//                         <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
//                             <span className="text-xs font-medium">{t("products.page")}</span>
//                             <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
//                                 {t("common.of")} {dataProductsTotalPage}
//                             </span>
//                         </div>
//                         <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{dataProductsPage}</p>
//                     </div>

//                     <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900">
//                         <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
//                             <span className="text-xs font-medium">{t("products.limitPerPage")}</span>
//                             <FiSliders className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
//                         </div>
//                         <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{dataProductsLimit}</p>
//                     </div>
//                 </div>

//                 <div className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900">
//                     <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//                         <div className="relative flex-1">
//                             <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
//                             <input
//                                 type="text"
//                                 placeholder={t("products.searchPlaceholder")}
//                                 value={search}
//                                 onChange={(e) => {
//                                     setSearch(e.target.value)
//                                     setDataProductsPage(1)
//                                 }}
//                                 className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-9 text-sm text-slate-900 placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800/80 dark:text-white dark:placeholder-slate-500 dark:focus:border-indigo-400 dark:focus:bg-slate-800 dark:focus:ring-indigo-500/20"
//                             />
//                             {search && (
//                                 <button
//                                     onClick={() => setSearch("")}
//                                     className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
//                                 >
//                                     <FiX className="h-4 w-4" />
//                                 </button>
//                             )}
//                         </div>

//                         <div className="flex flex-wrap items-center gap-2.5">
//                             <div className="flex items-center gap-2">
//                                 <FiLayers className="text-slate-400 dark:text-slate-500" />
//                                 <select
//                                     value={selectCatalog}
//                                     onChange={(e) => {
//                                         setSelectCatalog(e.target.value)
//                                         setDataProductsPage(1)
//                                     }}
//                                     className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:border-indigo-400"
//                                 >
//                                     <option value="">{t("products.allCategories")}</option>
//                                     {dataCatalog.map((cat) => (
//                                         <option key={cat.id} value={cat.id}>
//                                             {cat.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div className="flex items-center gap-2">
//                                 <span className="text-xs text-slate-500 dark:text-slate-400">{t("products.by")}</span>
//                                 <select
//                                     value={dataProductsLimit}
//                                     onChange={(e) => {
//                                         setDataProductsLimit(Number(e.target.value))
//                                         setDataProductsPage(1)
//                                     }}
//                                     className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800"
//                                 >
//                                     <option value={4}>4</option>
//                                     <option value={8}>8</option>
//                                     <option value={12}>12</option>
//                                     <option value={20}>20</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>

//                     {dataCatalog.length > 0 && (
//                         <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3 dark:border-slate-800">
//                             <span className="mr-1 text-xs font-medium text-slate-400 dark:text-slate-500">
//                                 {t("products.quickFilter")}
//                             </span>
//                             <button
//                                 onClick={() => {
//                                     setSelectCatalog("")
//                                     setDataProductsPage(1)
//                                 }}
//                                 className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${selectCatalog === ""
//                                         ? "bg-indigo-600 text-white shadow-xs"
//                                         : "bg-slate-100 text-slate-600 hover:bg-slate-200/70 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
//                                     }`}
//                             >
//                                 {t("common.all")} ({dataProductsTotal})
//                             </button>
//                             {dataCatalog.map((cat) => {
//                                 const isActive = String(selectCatalog) === String(cat.id)
//                                 return (
//                                     <button
//                                         key={cat.id}
//                                         onClick={() => {
//                                             setSelectCatalog(isActive ? "" : cat.id)
//                                             setDataProductsPage(1)
//                                         }}
//                                         className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${isActive
//                                                 ? "bg-indigo-600 text-white shadow-xs"
//                                                 : "bg-slate-100 text-slate-600 hover:bg-slate-200/70 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
//                                             }`}
//                                     >
//                                         {cat.name}
//                                     </button>
//                                 )
//                             })}
//                         </div>
//                     )}
//                 </div>

//                 <div>
//                     <div className="mb-4 flex items-center justify-between">
//                         <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
//                             <FiShoppingBag className="text-indigo-600 dark:text-indigo-400" />
//                             <span>{t("products.listTitle")}</span>
//                             <span className="text-xs font-normal text-slate-400 dark:text-slate-500">
//                                 ({t("products.found", { count: dataProductsTotal })})
//                             </span>
//                         </h2>
//                     </div>

//                     {loading ? (
//                         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//                             {Array.from({ length: dataProductsLimit }).map((_, i) => (
//                                 <div
//                                     key={i}
//                                     className="animate-pulse rounded-2xl border border-slate-200/70 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
//                                 >
//                                     <div className="h-36 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
//                                     <div className="mt-4 h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
//                                     <div className="mt-2 h-3 w-1/2 rounded bg-slate-100 dark:bg-slate-800/60" />
//                                     <div className="mt-4 flex justify-between">
//                                         <div className="h-5 w-16 rounded bg-slate-200 dark:bg-slate-800" />
//                                         <div className="h-5 w-12 rounded bg-slate-200 dark:bg-slate-800" />
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : dataProducts.length === 0 ? (
//                         <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900">
//                             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500 dark:bg-indigo-950/60 dark:text-indigo-400">
//                                 <FiBox className="h-8 w-8" />
//                             </div>
//                             <h3 className="mt-4 text-base font-semibold text-slate-800 dark:text-slate-200">
//                                 {t("products.notFound")}
//                             </h3>
//                             <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
//                                 {t("products.notFoundHint")}
//                             </p>
//                             {(search || selectCatalog) && (
//                                 <button
//                                     onClick={() => {
//                                         setSearch("")
//                                         setSelectCatalog("")
//                                         setDataProductsPage(1)
//                                     }}
//                                     className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700"
//                                 >
//                                     {t("products.resetFilters")}
//                                 </button>
//                             )}
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//                             {dataProducts.map((product) => {
//                                 const catalogLabel = product.catalogId
//                                     ? getCatalogName(product.catalogId)
//                                     : product.category || t("products.item")

//                                 return (
//                                     <div
//                                         key={product.id}
//                                         className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/40 dark:hover:shadow-indigo-500/10"
//                                     >
//                                         <div>
//                                             <div className="relative mb-3 flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-tr from-slate-100 to-indigo-50/40 text-slate-400 group-hover:from-indigo-50/50 group-hover:to-purple-50/50 dark:from-slate-800 dark:to-slate-800/60 dark:group-hover:from-slate-800 dark:group-hover:to-indigo-950/40">
//                                                 {product.image ? (
//                                                     <img
//                                                         src={product.image}
//                                                         alt={product.name}
//                                                         className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
//                                                     />
//                                                 ) : (
//                                                     <div className="flex flex-col items-center gap-1.5 text-indigo-300 dark:text-indigo-400">
//                                                         <FiBox className="h-10 w-10 transition-transform duration-300 group-hover:scale-110 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" />
//                                                         <span className="text-[10px] font-medium tracking-wide uppercase text-slate-400 dark:text-slate-500">
//                                                             Item
//                                                         </span>
//                                                     </div>
//                                                 )}

//                                                 <span className="absolute left-2.5 top-2.5 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold text-slate-600 shadow-xs backdrop-blur-xs dark:bg-slate-800/90 dark:text-slate-300">
//                                                     #{product.id}
//                                                 </span>

//                                                 <span className="absolute right-2.5 top-2.5 max-w-[120px] truncate rounded-md bg-indigo-600/90 px-2 py-0.5 text-[10px] font-semibold text-white shadow-xs backdrop-blur-xs">
//                                                     {catalogLabel}
//                                                 </span>
//                                             </div>

//                                             <h4 className="line-clamp-2 text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors dark:text-white dark:group-hover:text-indigo-400">
//                                                 {product.name || t("products.untitled")}
//                                             </h4>

//                                             {product.description && (
//                                                 <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
//                                                     {product.description}
//                                                 </p>
//                                             )}
//                                         </div>

//                                         <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
//                                             <div>
//                                                 {product.price !== undefined ? (
//                                                     <p className="text-base font-extrabold text-slate-900 dark:text-white">
//                                                         {Number(product.price).toLocaleString("ru-RU")} ₽
//                                                     </p>
//                                                 ) : (
//                                                     <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
//                                                         <FiCheckCircle className="h-3 w-3" /> {t("products.inStock")}
//                                                     </span>
//                                                 )}
//                                             </div>

//                                             <span className="rounded-lg bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-indigo-950 dark:group-hover:text-indigo-300">
//                                                 {t("products.details")}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 )
//                             })}
//                         </div>
//                     )}

//                     {dataProductsTotalPage > 1 && (
//                         <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-6 sm:flex-row dark:border-slate-800">
//                             <p className="text-xs text-slate-500 dark:text-slate-400">
//                                 {t("common.page")} <span className="font-semibold text-slate-900 dark:text-white">{dataProductsPage}</span> {t("common.of")}{" "}
//                                 <span className="font-semibold text-slate-900 dark:text-white">{dataProductsTotalPage}</span> ({t("common.total")}{" "}
//                                 {dataProductsTotal} {t("products.totalItems")})
//                             </p>

//                             <div className="flex items-center gap-1.5">
//                                 <button
//                                     disabled={dataProductsPage <= 1}
//                                     onClick={() => setDataProductsPage((p) => Math.max(1, p - 1))}
//                                     className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
//                                 >
//                                     <FiChevronLeft className="h-4 w-4" />
//                                     <span className="hidden sm:inline">{t("common.back")}</span>
//                                 </button>

//                                 <div className="flex items-center gap-1">
//                                     {Array.from({ length: Math.min(dataProductsTotalPage, 7) }).map((_, i) => {
//                                         let pageNum = i + 1
//                                         if (dataProductsTotalPage > 7 && dataProductsPage > 4) {
//                                             pageNum = dataProductsPage - 3 + i
//                                             if (pageNum > dataProductsTotalPage) return null
//                                         }

//                                         const isActive = pageNum === dataProductsPage

//                                         return (
//                                             <button
//                                                 key={pageNum}
//                                                 onClick={() => setDataProductsPage(pageNum)}
//                                                 className={`h-8 w-8 rounded-xl text-xs font-bold transition ${isActive
//                                                         ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 ring-2 ring-indigo-600/20"
//                                                         : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
//                                                     }`}
//                                             >
//                                                 {pageNum}
//                                             </button>
//                                         )
//                                     })}
//                                 </div>

//                                 <button
//                                     disabled={dataProductsPage >= dataProductsTotalPage}
//                                     onClick={() => setDataProductsPage((p) => Math.min(dataProductsTotalPage, p + 1))}
//                                     className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
//                                 >
//                                     <span className="hidden sm:inline">{t("common.next")}</span>
//                                     <FiChevronRight className="h-4 w-4" />
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     )
// }

// export default Products
