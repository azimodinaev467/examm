// import { useEffect, useState } from "react"
// import axios from "axios"
// import { Link } from "react-router"
// import { useTranslation } from "react-i18next"
// import { api, getAuthHeaders } from "../api/auth"
// import ThemeToggle from "../components/ThemeToggle"
// import LanguageToggle from "../components/LanguageToggle"
// import { FiArrowLeft, FiUserPlus, FiEdit2, FiTrash2, FiUsers } from "react-icons/fi"

// const emptyForm = {
//   name: "",
//   email: "",
//   password: "",
//   role: "user",
//   city: "",
// }

// const Users = () => {
//   const { t } = useTranslation()

//   const [users, setUsers] = useState([])
//   const [form, setForm] = useState(emptyForm)
//   const [editId, setEditId] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   async function getUsers() {
//     try {
//       const response = await axios.get(`${api}/users`, {
//         headers: getAuthHeaders(),
//       })

//       setUsers(response.data)
//     } catch (err) {
//       console.error(err)
//       setError(t("users.errorLoad"))
//     }
//   }

//   useEffect(() => {
//     getUsers()
//   }, [])

//   function openEdit(user) {
//     setEditId(user.id)
//     setForm({
//       name: user.name,
//       email: user.email,
//       password: "",
//       role: user.role,
//       city: user.city,
//     })
//     setError("")
//   }

//   async function saveUser(e) {
//     e.preventDefault()
//     setLoading(true)
//     setError("")

//     const payload = {
//       name: form.name,
//       email: form.email,
//       role: form.role,
//       city: form.city,
//     }

//     if (form.password.trim()) {
//       payload.password = form.password
//     }

//     try {
//       if (editId !== null) {
//         await axios.put(`${api}/users/${editId}`, payload, {
//           headers: getAuthHeaders(),
//         })
//       } else {
//         await axios.post(`${api}/users`, form, {
//           headers: getAuthHeaders(),
//         })
//       }

//       setForm(emptyForm)
//       setEditId(null)
//       await getUsers()
//     } catch (err) {
//       if (axios.isAxiosError(err)) {
//         setError(
//           err.response?.data?.message ||
//           t("users.errorSave")
//         )
//       } else {
//         setError(t("users.errorGeneric"))
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   async function deleteUser(id) {
//     if (!window.confirm(t("users.confirmDelete"))) return

//     setError("")

//     try {
//       await axios.delete(`${api}/users/${id}`, {
//         headers: getAuthHeaders(),
//       })

//       await getUsers()
//     } catch (err) {
//       if (axios.isAxiosError(err)) {
//         setError(
//           err.response?.data?.message ||
//           t("users.errorDelete")
//         )
//       } else {
//         setError(t("users.errorGeneric"))
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 transition-colors duration-200 sm:p-6 dark:bg-slate-950 dark:text-slate-100">
//       <div className="mx-auto max-w-6xl">
//         <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-3">
//             <Link
//               to="/"
//               className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
//             >
//               <FiArrowLeft className="h-4 w-4" />
//               <span>{t("common.home")}</span>
//             </Link>
//             <div className="flex items-center gap-2">
//               <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
//                 <FiUsers className="h-5 w-5" />
//               </div>
//               <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
//                 {t("users.title")}
//               </h1>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 self-start sm:self-auto">
//             <LanguageToggle />
//             <ThemeToggle showLabel />
//           </div>
//         </div>

//         {error && (
//           <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
//             {error}
//           </div>
//         )}

//         <form
//           onSubmit={saveUser}
//           className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900 sm:p-6"
//         >
//           <div className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-800 dark:text-slate-200">
//             <FiUserPlus className="text-blue-600 dark:text-blue-400" />
//             <span>{editId !== null ? t("users.editUser") : t("users.addUser")}</span>
//           </div>

//           <div className="grid gap-3 sm:grid-cols-2">
//             <input
//               className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:bg-slate-800"
//               placeholder={t("users.namePlaceholder")}
//               value={form.name}
//               onChange={(e) =>
//                 setForm({ ...form, name: e.target.value })
//               }
//               required
//             />

//             <input
//               className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:bg-slate-800"
//               type="email"
//               placeholder={t("users.emailPlaceholder")}
//               value={form.email}
//               onChange={(e) =>
//                 setForm({ ...form, email: e.target.value })
//               }
//               required
//             />

//             <input
//               className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:bg-slate-800"
//               type="password"
//               placeholder={editId !== null ? t("users.newPasswordPlaceholder") : t("users.passwordPlaceholder")}
//               value={form.password}
//               onChange={(e) =>
//                 setForm({ ...form, password: e.target.value })
//               }
//               required={editId === null}
//             />

//             <input
//               className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:bg-slate-800"
//               placeholder={t("users.cityPlaceholder")}
//               value={form.city}
//               onChange={(e) =>
//                 setForm({ ...form, city: e.target.value })
//               }
//               required
//             />

//             <select
//               className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
//               value={form.role}
//               onChange={(e) =>
//                 setForm({ ...form, role: e.target.value })
//               }
//             >
//               <option value="user">{t("users.roleUser")}</option>
//               <option value="admin">{t("users.roleAdmin")}</option>
//             </select>

//             <div className="flex gap-3">
//               <button
//                 disabled={loading}
//                 className="flex-1 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95 disabled:opacity-50"
//                 type="submit"
//               >
//                 {loading
//                   ? t("common.saving")
//                   : editId !== null
//                     ? t("users.saveChanges")
//                     : t("users.addBtn")}
//               </button>

//               {editId !== null && (
//                 <button
//                   type="button"
//                   className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
//                   onClick={() => {
//                     setEditId(null)
//                     setForm(emptyForm)
//                   }}
//                 >
//                   {t("common.cancel")}
//                 </button>
//               )}
//             </div>
//           </div>
//         </form>

//         <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead className="bg-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:bg-slate-800/80 dark:text-slate-300">
//                 <tr>
//                   <th className="p-3.5">{t("users.tableId")}</th>
//                   <th className="p-3.5">{t("users.tableName")}</th>
//                   <th className="p-3.5">{t("users.tableEmail")}</th>
//                   <th className="p-3.5">{t("users.tableRole")}</th>
//                   <th className="p-3.5">{t("users.tableCity")}</th>
//                   <th className="p-3.5 text-right">{t("users.tableActions")}</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
//                 {users.map((user) => (
//                   <tr
//                     key={user.id}
//                     className="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/40"
//                   >
//                     <td className="p-3.5 font-mono text-xs text-slate-500 dark:text-slate-400">
//                       #{user.id}
//                     </td>
//                     <td className="p-3.5 font-medium text-slate-900 dark:text-white">
//                       {user.name}
//                     </td>
//                     <td className="p-3.5 text-slate-600 dark:text-slate-300">
//                       {user.email}
//                     </td>
//                     <td className="p-3.5">
//                       <span
//                         className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${
//                           user.role === "admin"
//                             ? "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
//                             : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
//                         }`}
//                       >
//                         {user.role}
//                       </span>
//                     </td>
//                     <td className="p-3.5 text-slate-600 dark:text-slate-300">
//                       {user.city}
//                     </td>
//                     <td className="p-3.5 text-right">
//                       <div className="flex items-center justify-end gap-2">
//                         <button
//                           onClick={() => openEdit(user)}
//                           className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-white shadow-xs transition hover:bg-amber-600 active:scale-95"
//                         >
//                           <FiEdit2 className="h-3 w-3" />
//                           <span>{t("common.edit")}</span>
//                         </button>

//                         <button
//                           onClick={() => deleteUser(user.id)}
//                           className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow-xs transition hover:bg-red-700 active:scale-95"
//                         >
//                           <FiTrash2 className="h-3 w-3" />
//                           <span>{t("common.delete")}</span>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}

//                 {users.length === 0 && (
//                   <tr>
//                     <td colSpan={6} className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
//                       {t("users.noUsers")}
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Users
