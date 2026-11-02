import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router"
import { useTranslation } from "react-i18next"
import {
  FiShoppingCart,
  FiLogOut,
  FiHeart,
  FiTrash2,
  FiMinus,
  FiPlus,
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

import img1 from "../assets/4575e3df52fa214db1f3ce519277860c13b11e21.png"
import img2 from "../assets/5219e659b8a1d488abd136ce27f86ab3da3ceb37.png"
import img3 from "../assets/586c85231ab58d21463d86aa3768f5c6c78f8a1f.png"
import img4 from "../assets/7c597aa91ee5df5d1fd65d8184246c0c9918f920.png"
import img5 from "../assets/9531c63d3f618aefdf1ccb10a5aa0e2d00f45d0b.png"
import img6 from "../assets/9957e153a59c050946e77e8fc7e11525e87c4678.png"
import plantHero from "../assets/plant-hero.png"

const defaultCartItems = [
  {
    id: 1,
    name: "Barberton Daisy",
    sku: "1995751877966",
    price: 119.0,
    quantity: 2,
    image: img3,
  },
  {
    id: 2,
    name: "Blushing Bromeliad",
    sku: "19957518757065",
    price: 139.0,
    quantity: 6,
    image: img4,
  },
  {
    id: 3,
    name: "Aluminum Plant",
    sku: "1995751877766",
    price: 179.0,
    quantity: 9,
    image: img2,
  },
]

const interestedPlants = [
  {
    id: 1,
    name: "Beach Spider Lily",
    price: 129.0,
    image: plantHero,
  },
  {
    id: 2,
    name: "Blushing Bromeliad",
    price: 139.0,
    image: img4,
  },
  {
    id: 3,
    name: "Aluminum Plant",
    price: 179.0,
    image: img2,
  },
  {
    id: 4,
    name: "Bird's Nest Fern",
    price: 99.0,
    image: img5,
  },
  {
    id: 5,
    name: "Chinese Evergreen",
    price: 39.0,
    image: img6,
  },
]

const Cart = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const token = localStorage.getItem("token")

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.shop"), href: "/" },
    { label: t("nav.plantCare"), href: "/" },
    { label: t("nav.blogs"), href: "/" },
  ]

  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cart")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
      return defaultCartItems
    } catch {
      return defaultCartItems
    }
  })

  const [wishlistCount, setWishlistCount] = useState(0)
  const [couponCode, setCouponCode] = useState("")
  const [discountPercent, setDiscountPercent] = useState(0)
  const [couponMessage, setCouponMessage] = useState("")

  useEffect(() => {
    try {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      setWishlistCount(Array.isArray(storedWishlist) ? storedWishlist.length : 0)
    } catch {
      setWishlistCount(0)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login", { replace: true })
  }

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    if (!couponCode.trim()) return

    if (couponCode.toUpperCase() === "GREEN10" || couponCode.toUpperCase() === "SALE") {
      setDiscountPercent(10)
      setCouponMessage("10% discount applied!")
    } else {
      setDiscountPercent(5)
      setCouponMessage("Coupon applied: 5% discount!")
    }
  }

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 1),
    0
  )
  const discountAmount = (subtotal * discountPercent) / 100
  const shipping = cartItems.length > 0 ? 16.0 : 0.0
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping)
  const totalItemsCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)

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
                  className={`relative pb-1 text-sm font-medium transition ${
                    link.label === "Shop"
                      ? "text-slate-900 font-semibold dark:text-white"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  {link.label}
                  {link.label === "Shop" && (
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-green-500" />
                  )}
                </Link>
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
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[9px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate("/cart")}
              title="Cart"
              className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-green-600 bg-green-50 transition dark:bg-green-950/50 dark:text-green-400"
            >
              <FiShoppingCart className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              {totalItemsCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[9px] font-bold text-white">
                  {totalItemsCount}
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
              <span className="hidden min-[400px]:inline">Login</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-10">
        <div className="mb-6 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Link to="/" className="font-semibold text-slate-800 hover:text-green-600 dark:text-slate-200">
            Home
          </Link>
          <span>/</span>
          <Link to="/" className="text-slate-500 hover:text-green-600 dark:text-slate-400">
            Shop
          </Link>
          <span>/</span>
          <span className="font-medium text-green-600 dark:text-green-400">Shopping Cart</span>
        </div>

        {cartItems.length === 0 ? (
          <div className="mx-auto my-12 max-w-md rounded-3xl border border-slate-100 bg-slate-50/50 p-8 sm:p-12 text-center dark:border-slate-800 dark:bg-slate-900/40">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950/60 dark:text-green-400">
              <FiShoppingCart className="h-10 w-10" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-800 dark:text-white">
              Your cart is empty
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Looks like you haven't added any plants to your cart yet.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-green-500/30 transition hover:bg-green-600 active:scale-95"
            >
              Shop Now
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <div className="hidden border-b border-slate-200 pb-3 text-xs font-semibold text-slate-700 sm:grid sm:grid-cols-12 dark:border-slate-800 dark:text-slate-300">
                <span className="sm:col-span-6">Products</span>
                <span className="sm:col-span-2 text-center">Price</span>
                <span className="sm:col-span-2 text-center">Quantity</span>
                <span className="sm:col-span-1 text-center">Total</span>
                <span className="sm:col-span-1 text-right"></span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:grid sm:grid-cols-12 items-start sm:items-center py-4 sm:py-5 gap-3 sm:gap-0 bg-slate-50/40 sm:bg-transparent rounded-2xl sm:rounded-none p-3 sm:p-0 my-2 sm:my-0 dark:bg-slate-900/30 sm:dark:bg-transparent"
                  >
                    <div className="sm:col-span-6 flex items-center gap-3.5 w-full">
                      <div
                        onClick={() => navigate(`/product/${item.id}`)}
                        className="h-16 w-16 sm:h-18 sm:w-18 shrink-0 cursor-pointer overflow-hidden rounded-xl bg-slate-50 p-1.5 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain transition duration-200 hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4
                          onClick={() => navigate(`/product/${item.id}`)}
                          className="cursor-pointer truncate text-sm font-semibold text-slate-800 hover:text-green-600 transition dark:text-white dark:hover:text-green-400"
                        >
                          {item.name}
                        </h4>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          SKU: {item.sku || `199575187${item.id}`}
                        </p>
                      </div>
                    </div>

                    <div className="sm:col-span-2 text-center text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                      <span className="sm:hidden text-slate-400 mr-2">Price:</span>
                      ${Number(item.price).toFixed(2)}
                    </div>

                    <div className="sm:col-span-2 flex items-center justify-center">
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white transition hover:bg-green-600 active:scale-95"
                        >
                          <FiMinus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-xs sm:text-sm font-bold text-slate-800 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white transition hover:bg-green-600 active:scale-95"
                        >
                          <FiPlus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    <div className="sm:col-span-1 text-center text-xs sm:text-sm font-bold text-green-600 dark:text-green-400">
                      <span className="sm:hidden text-slate-400 font-normal mr-2">Total:</span>
                      ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </div>

                    <div className="sm:col-span-1 flex justify-end w-full sm:w-auto">
                      <button
                        onClick={() => removeItem(item.id)}
                        title="Delete product"
                        className="text-slate-400 transition hover:text-red-500 dark:hover:text-red-400 p-1"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
                <h3 className="border-b border-slate-200 pb-3 text-base font-bold text-slate-900 dark:border-slate-800 dark:text-white">
                  Cart Totals
                </h3>

                <div className="mt-5">
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    Coupon Apply
                  </label>
                  <form onSubmit={handleApplyCoupon} className="mt-2 flex overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xs dark:border-slate-700 dark:bg-slate-800">
                    <input
                      type="text"
                      placeholder="Enter coupon code here..."
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="min-w-0 flex-1 px-3 py-2 text-xs text-slate-800 outline-none placeholder-slate-400 dark:text-white dark:placeholder-slate-500 bg-transparent"
                    />
                    <button
                      type="submit"
                      className="bg-green-500 px-5 py-2 text-xs font-semibold text-white transition hover:bg-green-600 active:scale-95"
                    >
                      Apply
                    </button>
                  </form>
                  {couponMessage && (
                    <p className="mt-1.5 text-[11px] font-medium text-green-600 dark:text-green-400">
                      {couponMessage}
                    </p>
                  )}
                </div>

                <div className="mt-6 space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span>Coupon Discount</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      (-) ${discountAmount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 text-slate-600 dark:text-slate-400">
                    <div className="flex items-center justify-between">
                      <span>Shiping</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        ${shipping.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-[11px] text-green-600 cursor-pointer hover:underline self-end dark:text-green-400">
                      View shipping charge
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-3 dark:border-slate-800">
                    <div className="flex items-center justify-between text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      <span>Total</span>
                      <span className="text-green-600 dark:text-green-400">
                        ${grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full rounded-lg bg-green-500 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-green-500/20 transition hover:bg-green-600 active:scale-95"
                  >
                    Proceed To Checkout
                  </button>

                  <Link
                    to="/"
                    className="text-center text-xs font-medium text-green-600 hover:text-green-700 hover:underline dark:text-green-400"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-20 border-t border-slate-100 pt-10 dark:border-slate-800">
          <h3 className="border-b border-green-500/20 pb-3 text-base font-bold text-green-600 dark:text-green-400">
            You may be interested in
          </h3>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {interestedPlants.map((plant) => (
              <div
                key={plant.id}
                onClick={() => navigate(`/product/${plant.id}`)}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-36 items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-2 dark:bg-slate-800">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-2.5">
                  <p className="truncate text-xs font-semibold text-slate-800 dark:text-white">
                    {plant.name}
                  </p>
                  <p className="mt-1 text-xs font-bold text-green-600 dark:text-green-400">
                    ${Number(plant.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === 1 ? "w-6 bg-green-500" : "w-2 bg-slate-300 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>
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

export default Cart
