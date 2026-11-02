import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router"
import { useTranslation } from "react-i18next"
import {
  FiShoppingCart,
  FiLogOut,
  FiHeart,
  FiTrash2,
  FiEye,
  FiArrowRight,
  FiMapPin,
  FiMail,
  FiPhoneCall,
} from "react-icons/fi"
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa"
import ThemeToggle from "../components/ThemeToggle"
import LanguageToggle from "../components/LanguageToggle"
import Logo from "../assets/Logo.png"
import footerPlant2 from "../assets/Group 18.png"
import footerPlant3 from "../assets/Group 19.png"
import defaultPlant from "../assets/4575e3df52fa214db1f3ce519277860c13b11e21.png"

const Favorites = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const token = localStorage.getItem("token")

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.shop"), href: "/" },
    { label: t("nav.plantCare"), href: "/" },
    { label: t("nav.blogs"), href: "/" },
  ]
  const [favorites, setFavorites] = useState([])
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

  const loadFavorites = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("wishlist") || "[]")
      if (Array.isArray(stored)) {
        const normalized = stored.map((item, idx) => {
          if (typeof item === "object" && item !== null) {
            return {
              id: item.id || idx + 1,
              name: item.name || "Plant",
              price: item.price || 119,
              image: item.image || defaultPlant,
              discount: item.discount || false,
            }
          }
          return {
            id: item,
            name: `Plant #${item}`,
            price: 119,
            image: defaultPlant,
            discount: false,
          }
        })
        setFavorites(normalized)
      }
    } catch {
      setFavorites([])
    }
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login", { replace: true })
  }

  const removeFavorite = (id) => {
    const updated = favorites.filter((item) => item.id !== id)
    setFavorites(updated)
    localStorage.setItem("wishlist", JSON.stringify(updated))
  }

  const clearAllFavorites = () => {
    setFavorites([])
    localStorage.setItem("wishlist", JSON.stringify([]))
  }

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

  return (
    <div className="min-h-screen bg-white text-slate-800 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 overflow-x-hidden">
      <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-10">
          <Link to="/">
            <img src={Logo} alt="GreenShop" className="h-7 sm:h-8 w-auto object-contain" />
          </Link>

          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="relative pb-1 text-sm font-medium text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => navigate("/favorites")}
              title="Favorites"
              className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-green-600 bg-green-50 transition dark:bg-green-950/50 dark:text-green-400"
            >
              <FiHeart className="h-4 w-4 sm:h-4.5 sm:w-4.5 fill-current" />
              {favorites.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[9px] font-bold text-white">
                  {favorites.length}
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

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-10">
        <div className="mb-6 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Link to="/" className="font-semibold text-slate-800 hover:text-green-600 dark:text-slate-200">
            {t("nav.home")}
          </Link>
          <span>/</span>
          <Link to="/" className="text-slate-500 hover:text-green-600 dark:text-slate-400">
            {t("nav.shop")}
          </Link>
          <span>/</span>
          <span className="font-medium text-green-600 dark:text-green-400">{t("wishlist.title")}</span>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-5 dark:border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t("wishlist.title")}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {favorites.length === 0
                ? t("wishlist.emptyTitle")
                : t("wishlist.savedCount", { count: favorites.length })}
            </p>
          </div>

          {favorites.length > 0 && (
            <button
              onClick={clearAllFavorites}
              className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40"
            >
              <FiTrash2 className="h-3.5 w-3.5" />
              {t("wishlist.clear")}
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="mx-auto my-12 max-w-md rounded-3xl border border-slate-100 bg-slate-50/50 p-8 sm:p-12 text-center dark:border-slate-800 dark:bg-slate-900/40">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950/60 dark:text-green-400">
              <FiHeart className="h-10 w-10" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-800 dark:text-white">
              {t("wishlist.emptyTitle")}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {t("wishlist.emptyDesc")}
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-green-500/30 transition hover:bg-green-600 active:scale-95"
            >
              {t("wishlist.explore")}
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                {product.discount && (
                  <span className="absolute left-3 top-3 z-10 rounded-md bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    13% OFF
                  </span>
                )}

                <button
                  onClick={() => removeFavorite(product.id)}
                  title="Remove from wishlist"
                  className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-sm backdrop-blur-xs transition hover:bg-red-500 hover:text-white dark:bg-slate-800/90 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white"
                >
                  <FiTrash2 className="h-3.5 w-3.5" />
                </button>

                <div
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="flex h-44 sm:h-48 cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-3 transition dark:bg-slate-800"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mt-3 flex flex-1 flex-col justify-between">
                  <div>
                    <h4
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="cursor-pointer truncate text-sm font-semibold text-slate-800 hover:text-green-600 transition dark:text-white dark:hover:text-green-400"
                    >
                      {product.name}
                    </h4>

                    <p className="mt-1 text-sm font-bold text-green-600 dark:text-green-400">
                      ${Number(product.price).toFixed(2)}
                      {product.discount && (
                        <span className="ml-2 text-xs font-normal text-slate-400 line-through">
                          ${(Number(product.price) * 1.13).toFixed(2)}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-500 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-green-600 active:scale-95"
                    >
                      <FiShoppingCart className="h-3.5 w-3.5" />
                      <span>{t("wishlist.addToCart")}</span>
                    </button>

                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      title="View Details"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-green-400 hover:text-green-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-green-500 dark:hover:text-green-400"
                    >
                      <FiEye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="mt-16 border-t border-slate-100 bg-slate-50/60 pt-10 text-slate-700 transition-colors dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
        <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-start pr-0 sm:pr-4 lg:border-r lg:border-slate-200/80 dark:lg:border-slate-800">
              <div className="mb-3 flex h-20 w-20 items-center justify-center">
                <img src={footerPlant2} alt="Garden Care" className="h-full w-full object-contain" />
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-white">Garden Care</h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                We are an online plant shop offering a wide range of cheap and trendy plants.
              </p>
            </div>

            <div className="flex flex-col items-start pr-0 sm:pr-4 lg:border-r lg:border-slate-200/80 dark:lg:border-slate-800">
              <div className="mb-3 flex h-20 w-20 items-center justify-center">
                <img src={footerPlant2} alt="Plant Renovation" className="h-full w-full object-contain" />
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-white">Plant Renovation</h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                We are an online plant shop offering a wide range of cheap and trendy plants.
              </p>
            </div>

            <div className="flex flex-col items-start pr-0 sm:pr-4 lg:border-r lg:border-slate-200/80 dark:lg:border-slate-800">
              <div className="mb-3 flex h-20 w-20 items-center justify-center">
                <img src={footerPlant3} alt="Watering Graden" className="h-full w-full object-contain" />
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-white">Watering Graden</h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                We are an online plant shop offering a wide range of cheap and trendy plants.
              </p>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-800 dark:text-white">
                  Would you like to join newsletters?
                </h4>
                <div className="mt-4 flex overflow-hidden rounded-lg shadow-xs">
                  <input
                    type="email"
                    placeholder="enter your email address..."
                    className="min-w-0 flex-1 bg-white px-3.5 py-2.5 text-xs text-slate-800 outline-none placeholder-slate-400 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                  />
                  <button className="shrink-0 bg-green-500 px-5 sm:px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-green-600 active:scale-95">
                    Join
                  </button>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  We usually post offers and challenges in newsletter. We're your online houseplant destination. We offer a wide range of houseplants and accessories shipped directly from our (green)house to yours!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-y border-green-200/60 bg-green-50/70 py-6 transition-colors dark:border-green-900/50 dark:bg-green-950/30">
          <div className="mx-auto flex max-w-7xl flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-5 px-4 sm:px-10">
            <Link to="/">
              <img src={Logo} alt="GreenShop" className="h-7 sm:h-8 w-auto object-contain" />
            </Link>

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
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">My Account</h4>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
                <li className="hover:text-green-600 cursor-pointer transition">My Account</li>
                <li className="hover:text-green-600 cursor-pointer transition">Our stores</li>
                <li className="hover:text-green-600 cursor-pointer transition">Contact us</li>
                <li className="hover:text-green-600 cursor-pointer transition">Career</li>
                <li className="hover:text-green-600 cursor-pointer transition">Specials</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">Help & Guide</h4>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
                <li className="hover:text-green-600 cursor-pointer transition">Help Center</li>
                <li className="hover:text-green-600 cursor-pointer transition">How to Buy</li>
                <li className="hover:text-green-600 cursor-pointer transition">Shipping & Delivery</li>
                <li className="hover:text-green-600 cursor-pointer transition">Product Policy</li>
                <li className="hover:text-green-600 cursor-pointer transition">How to Return</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">Categories</h4>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
                <li className="hover:text-green-600 cursor-pointer transition">House Plants</li>
                <li className="hover:text-green-600 cursor-pointer transition">Potter Plants</li>
                <li className="hover:text-green-600 cursor-pointer transition">Seeds</li>
                <li className="hover:text-green-600 cursor-pointer transition">Small Plants</li>
                <li className="hover:text-green-600 cursor-pointer transition">Accessories</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">Social Media</h4>
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

              <h4 className="mt-7 text-sm font-bold text-slate-800 dark:text-white">We accept</h4>
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
            © 2021 GreenShop. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Favorites
