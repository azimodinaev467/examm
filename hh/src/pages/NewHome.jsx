import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useTranslation } from "react-i18next"
import axios from "axios"
import { api } from "../api/auth"
import {
  FiShoppingCart,
  FiLogOut,
  FiArrowRight,
  FiHeart,
  FiEye,
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiMail,
  FiPhoneCall,
} from "react-icons/fi"
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa"
import { TbLeaf } from "react-icons/tb"
import ThemeToggle from "../components/ThemeToggle"
import LanguageToggle from "../components/LanguageToggle"
import Logo from "../assets/Logo.png"
import plantHero from "../assets/plant-hero.png"

import img1 from "../assets/4575e3df52fa214db1f3ce519277860c13b11e21.png"
import img2 from "../assets/5219e659b8a1d488abd136ce27f86ab3da3ceb37.png"
import img3 from "../assets/586c85231ab58d21463d86aa3768f5c6c78f8a1f.png"
import img4 from "../assets/7c597aa91ee5df5d1fd65d8184246c0c9918f920.png"
import img5 from "../assets/9531c63d3f618aefdf1ccb10a5aa0e2d00f45d0b.png"
import img6 from "../assets/9957e153a59c050946e77e8fc7e11525e87c4678.png"
import img7 from "../assets/4826f3a41a2148d881d8376b26471cced915b1bb.jpg"
import img8 from "../assets/78e9e6c190effae17498640571679183299f774e.jpg"
import img9 from "../assets/plant-hero.png"
import saleVideo from "../assets/gemini_generated_video_b3a63e92.mp4"

import promoImg1 from "../assets/image 14.png"
import promoImg2 from "../assets/image 15.png"
import blogImg1 from "../assets/708d5ac34916119d54b3f3ce81cb3585303dc87b.jpg"
import blogImg2 from "../assets/4f354de5b3a1897ab9540ae4953f1e0f0ace9952.jpg"
import blogImg3 from "../assets/5d6afe0519b43ea40d6912ed9f6c86bde26ac437.jpg"
import blogImg4 from "../assets/76eca5aeaad8a62909bb4bd3fb02922695ada788.jpg"

import footerPlant1 from "../assets/1e460c89ee17b2b09a69f96d2552ed3b0b04ac05.png"
import footerPlant2 from "../assets/Group 18.png"
import footerPlant3 from "../assets/Group 19.png"

const myImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img1, img2, img3, img4, img5, img6]

const NewHome = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const token = localStorage.getItem("token")

  const navLinks = [
    { label: t("nav.home"), key: "Home" },
    { label: t("nav.shop"), key: "Shop" },
    { label: t("nav.plantCare"), key: "Plant Care" },
    { label: t("nav.blogs"), key: "Blogs" },
  ]

  const sizes = [
    { label: t("shop.small"), count: 119 },
    { label: t("shop.medium"), count: 86 },
    { label: t("shop.large"), count: 78 },
  ]

  const shopTabs = [
    { label: t("shop.tabAllPlants"), key: "All Plants" },
    { label: t("shop.tabNewArrivals"), key: "New Arrivals" },
    { label: t("shop.tabSale"), key: "Sale" },
  ]

  const [activeNav, setActiveNav] = useState("Home")
  const [cartCount, setCartCount] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]")
      if (Array.isArray(stored) && stored.length > 0) {
        return stored.reduce((acc, item) => acc + (item.quantity || 1), 0)
      }
      return 17
    } catch {
      return 17
    }
  })

  const addToCart = (product) => {
    try {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]")
      const existing = stored.find((item) => item.id === product.id)
      let next
      if (existing) {
        next = stored.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        )
      } else {
        next = [
          ...stored,
          {
            id: product.id,
            name: product.name,
            sku: `199575187${product.id}`,
            price: product.price || 119,
            quantity: 1,
            image: product.image,
          },
        ]
      }
      localStorage.setItem("cart", JSON.stringify(next))
      setCartCount(next.reduce((acc, item) => acc + (item.quantity || 1), 0))
    } catch (e) {
      console.error(e)
    }
  }

  const [dataCatalog, setDataCatalog] = useState([])
  const [dataProducts, setDataProducts] = useState([])
  const [dataProductsTotal, setDataProductsTotal] = useState(0)
  const [dataProductsTotalPage, setDataProductsTotalPage] = useState(1)
  const [dataProductsPage, setDataProductsPage] = useState(1)
  const [selectCatalog, setSelectCatalog] = useState("")
  const [activeTab, setActiveTab] = useState("All Plants")
  const [loading, setLoading] = useState(false)
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist") || "[]")
    } catch {
      return []
    }
  })

  const isFavorited = (id) =>
    wishlist.some((item) => (typeof item === "object" ? item.id === id : item === id))

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => (typeof item === "object" ? item.id === product.id : item === product.id))
      let next
      if (exists) {
        next = prev.filter((item) => (typeof item === "object" ? item.id !== product.id : item !== product.id))
      } else {
        next = [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            discount: product.discount,
          },
        ]
      }
      localStorage.setItem("wishlist", JSON.stringify(next))
      return next
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login", { replace: true })
  }

  const GetCatalog = async () => {
    try {
      const { data } = await axios.get(api + "/catalogs")
      setDataCatalog(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
    }
  }

  const GetProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ limit: 9, page: dataProductsPage })
      if (selectCatalog) params.append("catalogId", selectCatalog)

      const { data } = await axios.get(`${api}/products?${params.toString()}`, {
        headers: { Authorization: "Bearer " + token },
      })

      const products = (data?.data || []).map((p, i) => ({
        ...p,
        image: myImages[i] || myImages[i % myImages.length],
      }))

      setDataProducts(products)
      setDataProductsTotal(data?.total || 0)
      setDataProductsTotalPage(data?.totalPages || 1)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    GetCatalog()
  }, [])

  useEffect(() => {
    GetProducts()
  }, [dataProductsPage, selectCatalog])

  return (
    <div className="min-h-screen bg-white transition-colors duration-200 dark:bg-slate-950 overflow-x-hidden">
      <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-10">
          <img src={Logo} alt="GreenShop" className="h-7 sm:h-8 w-auto object-contain" />

          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <li key={link.key || link.label}>
                <button
                  onClick={() => setActiveNav(link.key || link.label)}
                  className={`relative pb-1 text-sm font-medium transition ${activeNav === (link.key || link.label)
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                    }`}
                >
                  {link.label}
                  {activeNav === (link.key || link.label) && (
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-green-500" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => navigate("/favorites")}
              title="Favorites"
              className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <FiHeart className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[9px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate("/cart")}
              title="Cart"
              className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <FiShoppingCart className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="mx-0.5 h-4 w-px bg-slate-200 dark:bg-slate-700 sm:mx-1 sm:h-5" />
            <LanguageToggle />
            <ThemeToggle />

            <button
              onClick={handleLogout}
              className="ml-0.5 sm:ml-1 flex items-center gap-1 sm:gap-1.5 rounded-lg bg-green-500 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold text-white shadow-sm transition hover:bg-green-600 active:scale-95"
            >
              <FiLogOut className="h-3.5 w-3.5" />
              <span className="hidden min-[400px]:inline">{token ? t("nav.logout") : t("nav.login")}</span>
            </button>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden lg:mx-auto lg:max-w-7xl">
        <div className="relative flex min-h-[340px] items-center justify-between gap-4 bg-green-50 px-5 py-8 dark:bg-green-950/40 lg:bg-transparent lg:px-10 lg:py-12 lg:min-h-[460px] lg:dark:bg-transparent">
          <div className="z-10 max-w-[55%] lg:max-w-lg">
            <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 lg:mb-3 lg:text-xs">
              {t("hero.welcome")}
            </div>

            <h1 className="text-2xl font-extrabold leading-tight text-slate-800 dark:text-white lg:text-5xl">
              {t("hero.title1")}
              <br />
              <span className="text-slate-800 dark:text-white">{t("hero.title2")}</span>
              <span className="text-green-500">{t("hero.title3")}</span>
            </h1>

            <p className="mt-3 max-w-[200px] text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 lg:mt-5 lg:max-w-xs lg:text-sm">
              {t("hero.description")}
            </p>

            <div className="mt-5 lg:mt-8">
              <button className="flex items-center gap-2 rounded-lg bg-green-500 px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-white shadow-md shadow-green-500/30 transition hover:bg-green-600 active:scale-95 lg:px-7 lg:py-3 lg:text-sm">
                {t("hero.shopNow")}
                <FiArrowRight className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
              </button>
            </div>
          </div>

          <div className="relative flex flex-shrink-0 items-end lg:hidden">
            <img src={plantHero} alt="Hero plant" className="h-[200px] w-auto object-contain drop-shadow-xl" />
            <img src={plantHero} alt="Small plant" className="absolute bottom-0 -left-6 z-10 h-[55px] w-auto object-contain" />
          </div>

          <div className="relative hidden flex-shrink-0 items-end lg:flex">
            <div className="absolute inset-0 -z-10 rounded-full bg-slate-100 blur-3xl dark:bg-slate-900" />
            <img src={plantHero} alt="Hero plant" className="h-[320px] w-auto object-contain drop-shadow-2xl sm:h-[360px]" />
            <img src={plantHero} alt="Small plant" className="absolute bottom-0 -left-10 z-10 h-[85px] w-auto object-contain" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 bg-green-50 pb-5 dark:bg-green-950/40 lg:bg-transparent lg:dark:bg-transparent lg:pb-8">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-2 rounded-full transition-all ${i === 1 ? "w-6 bg-green-500" : "w-2 bg-slate-300 dark:bg-slate-700"}`} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-10">
        <div className="flex gap-8">
          <aside className="hidden w-52 flex-shrink-0 lg:block">
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-bold text-slate-800 dark:text-white">{t("shop.categories")}</h3>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => { setSelectCatalog(""); setDataProductsPage(1) }}
                    className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-sm transition ${selectCatalog === ""
                      ? "font-semibold text-green-600"
                      : "text-slate-600 hover:text-green-600 dark:text-slate-400 dark:hover:text-green-400"
                      }`}
                  >
                    <span>{t("shop.allPlants")}</span>
                    <span className="text-xs text-slate-400">({dataProductsTotal})</span>
                  </button>
                </li>
                {dataCatalog.slice(0, 8).map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => { setSelectCatalog(cat.id); setDataProductsPage(1) }}
                      className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-sm transition ${String(selectCatalog) === String(cat.id)
                        ? "font-semibold text-green-600"
                        : "text-slate-600 hover:text-green-600 dark:text-slate-400 dark:hover:text-green-400"
                        }`}
                    >
                      <span>{cat.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6 h-px bg-slate-100 dark:bg-slate-800" />

            <div className="mb-6">
              <h3 className="mb-3 text-sm font-bold text-slate-800 dark:text-white">{t("shop.priceRange")}</h3>
              <input type="range" min={0} max={2000} defaultValue={1200} className="w-full accent-green-500" />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Price: $39 – $1230</p>
              <button className="mt-3 w-full rounded-lg bg-green-500 py-1.5 text-xs font-semibold text-white transition hover:bg-green-600">
                {t("shop.filter")}
              </button>
            </div>

            <div className="mb-6 h-px bg-slate-100 dark:bg-slate-800" />

            <div className="mb-6">
              <h3 className="mb-3 text-sm font-bold text-slate-800 dark:text-white">{t("shop.size")}</h3>
              <ul className="space-y-1">
                {sizes.map((s) => (
                  <li key={s.label}>
                    <button className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-sm text-slate-600 transition hover:text-green-600 dark:text-slate-400 dark:hover:text-green-400">
                      <span>{s.label}</span>
                      <span className="text-xs text-slate-400">({s.count})</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6 h-px bg-slate-100 dark:bg-slate-800" />

            <div className="overflow-hidden rounded-2xl shadow-sm">
              <video
                src={saleVideo}
                autoPlay
                loop
                muted
                playsInline
                className="h-64 w-full object-cover"
              />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-1">
                {shopTabs.map((tab) => (
                  <button
                    key={tab.key || tab}
                    onClick={() => setActiveTab(tab.key || tab)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${activeTab === (tab.key || tab)
                      ? "border-b-2 border-green-500 text-green-600 dark:text-green-400"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                      }`}
                  >
                    {tab.label || tab}
                  </button>
                ))}
              </div>
              <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex dark:text-slate-400">
                <span>{t("shop.sortBy")}</span>
                <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 outline-none">
                  <option>{t("shop.defaultSorting")}</option>
                  <option>{t("shop.priceLowHigh")}</option>
                  <option>{t("shop.priceHighLow")}</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="animate-pulse rounded-2xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-3 h-44 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="mt-2 h-4 w-1/2 rounded bg-slate-100 dark:bg-slate-800" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {dataProducts.map((product) => (
                  <div key={product.id} className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                    {product.discount && (
                      <span className="absolute left-2 top-2 z-10 rounded-md bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white">
                        {t("shop.discountBadge")}
                      </span>
                    )}

                    <div className="relative flex h-44 items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-800">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain p-3 transition duration-300 group-hover:scale-105"
                      />
                      <button
                        onClick={() => toggleWishlist(product)}
                        className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border shadow-sm transition lg:hidden ${isFavorited(product.id) ? "border-red-400 bg-red-50 text-red-500" : "border-slate-200 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-800"}`}
                      >
                        <FiHeart className={`h-3 w-3 ${isFavorited(product.id) ? "fill-current" : ""}`} />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 flex translate-y-full items-center justify-center gap-2 bg-white/80 py-2 backdrop-blur-sm transition duration-200 group-hover:translate-y-0 dark:bg-slate-900/80">
                        <button
                          onClick={() => addToCart(product)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white shadow-sm transition hover:bg-green-600"
                        >
                          <FiShoppingCart className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className={`flex h-8 w-8 items-center justify-center rounded-full border shadow-sm transition ${isFavorited(product.id)
                            ? "border-red-400 bg-red-50 text-red-500"
                            : "border-slate-200 bg-white text-slate-500 hover:border-red-300 hover:text-red-400 dark:border-slate-700 dark:bg-slate-800"
                            }`}
                        >
                          <FiHeart className={`h-3.5 w-3.5 ${isFavorited(product.id) ? "fill-current" : ""}`} />
                        </button>
                        <button
                          onClick={() => navigate(`/product/${product.id}`)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-green-300 hover:text-green-500 dark:border-slate-700 dark:bg-slate-800"
                        >
                          <FiEye className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-3">
                      <p
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="line-clamp-1 text-sm font-semibold text-slate-800 hover:text-green-600 cursor-pointer transition dark:text-white dark:hover:text-green-400"
                      >
                        {product.name}
                      </p>
                      <p className="mt-1 text-sm font-bold text-green-600 dark:text-green-400">
                        ${product.price?.toFixed(2)}
                        {product.discount && (
                          <span className="ml-2 text-xs font-normal text-slate-400 line-through">
                            ${(product.price * 1.13).toFixed(2)}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {dataProductsTotalPage > 1 && (
              <div className="mt-8 flex items-center justify-end gap-1">
                <button
                  disabled={dataProductsPage <= 1}
                  onClick={() => setDataProductsPage((p) => Math.max(1, p - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <FiChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: Math.min(dataProductsTotalPage, 5) }).map((_, i) => {
                  const page = i + 1
                  return (
                    <button
                      key={page}
                      onClick={() => setDataProductsPage(page)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-bold transition ${dataProductsPage === page
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                        }`}
                    >
                      {page}
                    </button>
                  )
                })}
                <button
                  disabled={dataProductsPage >= dataProductsTotalPage}
                  onClick={() => setDataProductsPage((p) => Math.min(dataProductsTotalPage, p + 1))}
                  className="flex h-8 w-8 items-center justify-center "
                >
                  <FiChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-10">

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="relative w-28 sm:w-36 flex-shrink-0">
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border-4 border-green-100 opacity-40 dark:border-green-900" />
              <img src={promoImg1} alt="Summer Cactus" className="relative z-10 h-28 sm:h-36 w-full object-contain drop-shadow-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-extrabold uppercase leading-tight text-slate-800 dark:text-white">
                {t("promo.summerCactus")}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {t("promo.description")}
              </p>
              <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-green-600 active:scale-95">
                {t("promo.findMore")}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="relative w-28 sm:w-36 flex-shrink-0">
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border-4 border-green-100 opacity-40 dark:border-green-900" />
              <img src={promoImg2} alt="Styling Trends" className="relative z-10 h-28 sm:h-36 w-full object-contain drop-shadow-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-extrabold uppercase leading-tight text-slate-800 dark:text-white">
                {t("promo.stylingTrends")}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {t("promo.description")}
              </p>
              <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-green-600 active:scale-95">
                {t("promo.findMore")}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t("blog.title")}</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {t("blog.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl">
                <img src={blogImg1} alt="Blog 1" className="h-44 w-full object-cover transition duration-300 group-hover:scale-105" />
              </div>
              <div className="mt-3">
                <p className="text-[10px] text-green-600 dark:text-green-400">September 12 | Read in 6 minutes</p>
                <h4 className="mt-1 text-sm font-bold text-slate-800 dark:text-white">Cactus & Succulent Care Tips</h4>
                <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                  Cacti are succulents are easy care plants for any home or patio.
                </p>
                <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
                  {t("blog.readMore")}
                </p>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl">
                <img src={blogImg2} alt="Blog 2" className="h-44 w-full object-cover transition duration-300 group-hover:scale-105" />
              </div>
              <div className="mt-3">
                <p className="text-[10px] text-green-600 dark:text-green-400">September 13 | Read in 2 minutes</p>
                <h4 className="mt-1 text-sm font-bold text-slate-800 dark:text-white">Top 10 Succulents for Your Home</h4>
                <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                  Best in hanging baskets. Prefers medium to high light.
                </p>
                <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
                  {t("blog.readMore")}
                </p>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl">
                <img src={blogImg3} alt="Blog 3" className="h-44 w-full object-cover transition duration-300 group-hover:scale-105" />
              </div>
              <div className="mt-3">
                <p className="text-[10px] text-green-600 dark:text-green-400">September 15 | Read in 3 minutes</p>
                <h4 className="mt-1 text-sm font-bold text-slate-800 dark:text-white">Cacti & Succulent Care Tips</h4>
                <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                  Cacti and succulents thrive in containers and because most are...
                </p>
                <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
                  {t("blog.readMore")}
                </p>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl">
                <img src={blogImg4} alt="Blog 4" className="h-44 w-full object-cover transition duration-300 group-hover:scale-105" />
              </div>
              <div className="mt-3">
                <p className="text-[10px] text-green-600 dark:text-green-400">September 15 | Read in 2 minutes</p>
                <h4 className="mt-1 text-sm font-bold text-slate-800 dark:text-white">Best Houseplants Room By Room</h4>
                <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                  The benefits of houseplants are endless. In addition to...
                </p>
                <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
                  {t("blog.readMore")}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <footer className="mt-12 border-t border-slate-100 bg-slate-50/60 pt-10 text-slate-700 transition-colors dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
        <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-start pr-0 sm:pr-4 lg:border-r lg:border-slate-200/80 dark:lg:border-slate-800">
              <div className="mb-3 flex h-20 w-20 items-center justify-center">
                <img src={footerPlant2} alt="Garden Care" className="h-full w-full object-contain" />
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-white">{t("footer.gardenCare")}</h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {t("footer.featureDesc")}
              </p>
            </div>

            <div className="flex flex-col items-start pr-0 sm:pr-4 lg:border-r lg:border-slate-200/80 dark:lg:border-slate-800">
              <div className="mb-3 flex h-20 w-20 items-center justify-center">
                <img src={footerPlant2} alt="Plant Renovation" className="h-full w-full object-contain" />
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-white">{t("footer.plantRenovation")}</h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {t("footer.featureDesc")}
              </p>
            </div>

            <div className="flex flex-col items-start pr-0 sm:pr-4 lg:border-r lg:border-slate-200/80 dark:lg:border-slate-800">
              <div className="mb-3 flex h-20 w-20 items-center justify-center">
                <img src={footerPlant3} alt="Watering Graden" className="h-full w-full object-contain" />
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-white">{t("footer.wateringGarden")}</h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {t("footer.featureDesc")}
              </p>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-800 dark:text-white">
                  {t("footer.newsletterTitle")}
                </h4>
                <div className="mt-4 flex overflow-hidden rounded-lg shadow-xs">
                  <input
                    type="email"
                    placeholder={t("footer.emailPlaceholder")}
                    className="min-w-0 flex-1 bg-white px-3.5 py-2.5 text-xs text-slate-800 outline-none placeholder-slate-400 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                  />
                  <button className="shrink-0 bg-green-500 px-5 sm:px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-green-600 active:scale-95">
                    {t("footer.join")}
                  </button>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {t("footer.newsletterDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-y border-green-200/60 bg-green-50/70 py-6 transition-colors dark:border-green-900/50 dark:bg-green-950/30">
          <div className="mx-auto flex max-w-7xl flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-5 px-4 sm:px-10">
            <img src={Logo} alt="GreenShop" className="h-7 sm:h-8 w-auto object-contain" />

            <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
              <FiMapPin className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
              <span>70 West Buckingham Ave.<br />Farmingdale, NY 11735</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
              <FiMail className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
              <span>contact@greenshop.com</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
              <FiPhoneCall className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
              <span>+88 01911 717 490</span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">{t("footer.myAccount")}</h4>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
                <li className="hover:text-green-600 cursor-pointer transition">{t("footer.myAccount")}</li>
                <li className="hover:text-green-600 cursor-pointer transition">{t("footer.ourStores")}</li>
                <li className="hover:text-green-600 cursor-pointer transition">{t("footer.contactUs")}</li>
                <li className="hover:text-green-600 cursor-pointer transition">{t("footer.career")}</li>
                <li className="hover:text-green-600 cursor-pointer transition">{t("footer.specials")}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">{t("footer.helpGuide")}</h4>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
                <li className="hover:text-green-600 cursor-pointer transition">{t("footer.helpCenter")}</li>
                <li className="hover:text-green-600 cursor-pointer transition">{t("footer.howToBuy")}</li>
                <li className="hover:text-green-600 cursor-pointer transition">{t("footer.shippingDelivery")}</li>
                <li className="hover:text-green-600 cursor-pointer transition">{t("footer.productPolicy")}</li>
                <li className="hover:text-green-600 cursor-pointer transition">{t("footer.howToReturn")}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">{t("footer.categories")}</h4>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
                <li className="hover:text-green-600 cursor-pointer transition">{t("footer.housePlants")}</li>
                <li className="hover:text-green-600 cursor-pointer transition">{t("footer.potterPlants")}</li>
                <li className="hover:text-green-600 cursor-pointer transition">{t("footer.seeds")}</li>
                <li className="hover:text-green-600 cursor-pointer transition">{t("footer.smallPlants")}</li>
                <li className="hover:text-green-600 cursor-pointer transition">{t("footer.accessories")}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">{t("footer.socialMedia")}</h4>
              <div className="mt-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-green-200 text-green-600 transition hover:bg-green-500 hover:text-white dark:border-green-800 dark:text-green-400 cursor-pointer">
                  <FaFacebookF className="h-3.5 w-3.5" />
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-green-200 text-green-600 transition hover:bg-green-500 hover:text-white dark:border-green-800 dark:text-green-400 cursor-pointer">
                  <FaInstagram className="h-3.5 w-3.5" />
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-green-200 text-green-600 transition hover:bg-green-500 hover:text-white dark:border-green-800 dark:text-green-400 cursor-pointer">
                  <FaTwitter className="h-3.5 w-3.5" />
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-green-200 text-green-600 transition hover:bg-green-500 hover:text-white dark:border-green-800 dark:text-green-400 cursor-pointer">
                  <FaLinkedinIn className="h-3.5 w-3.5" />
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-green-200 text-green-600 transition hover:bg-green-500 hover:text-white dark:border-green-800 dark:text-green-400 cursor-pointer">
                  <FaYoutube className="h-3.5 w-3.5" />
                </div>
              </div>

              <h4 className="mt-7 text-sm font-bold text-slate-800 dark:text-white">{t("footer.weAccept")}</h4>
              <div className="mt-3 flex items-center gap-2">
                <span className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-extrabold italic text-blue-800 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-blue-400">
                  PayPal
                </span>
                <span className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-bold text-red-600 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-red-400">
                  MasterCard
                </span>
                <span className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-extrabold text-blue-600 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-blue-300">
                  VISA
                </span>
                <span className="rounded border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold text-sky-700 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-sky-300">
                  AMEX
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-200/80 pt-6 text-center text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
            {t("footer.copyright")}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default NewHome
