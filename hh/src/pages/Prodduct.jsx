import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router"
import {
  FiShoppingCart,
  FiLogOut,
  FiHeart,
  FiCheckCircle,
  FiChevronDown,
  FiMapPin,
  FiMail,
  FiPhoneCall,
  FiX,
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
import thankYouImg from "../assets/thank-you.png"

import img2 from "../assets/5219e659b8a1d488abd136ce27f86ab3da3ceb37.png"
import img3 from "../assets/586c85231ab58d21463d86aa3768f5c6c78f8a1f.png"
import img4 from "../assets/7c597aa91ee5df5d1fd65d8184246c0c9918f920.png"

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

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/" },
  { label: "Plant Care", href: "/" },
  { label: "Blogs", href: "/" },
]

const Prodduct = () => {
  const navigate = useNavigate()

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
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [shipDifferent, setShipDifferent] = useState(false)
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [discountPercent, setDiscountPercent] = useState(0)
  const [couponMessage, setCouponMessage] = useState("")
  const [orderModalOpen, setOrderModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "United States",
    city: "",
    streetAddress: "",
    apartment: "",
    state: "California",
    zip: "",
    email: "",
    phoneCode: "+966",
    phone: "",
    notes: "",
  })

  useEffect(() => {
    try {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      setWishlistCount(Array.isArray(storedWishlist) ? storedWishlist.length : 0)
    } catch {
      setWishlistCount(0)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login", { replace: true })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    if (!couponCode.trim()) return
    if (couponCode.toUpperCase() === "GREEN10" || couponCode.toUpperCase() === "SALE") {
      setDiscountPercent(10)
      setCouponMessage("10% discount applied!")
    } else {
      setDiscountPercent(5)
      setCouponMessage("5% coupon applied!")
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

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    setOrderModalOpen(true)
  }

  const handleFinishOrder = () => {
    setOrderModalOpen(false)
    localStorage.removeItem("cart")
    navigate("/")
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
              className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
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
          <span className="font-medium text-green-600 dark:text-green-400">Checkout</span>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Billing Address
            </h2>

            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-green-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-green-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Country / Region <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-1.5">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3.5 py-2 pr-8 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-green-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-green-500"
                    >
                      <option>Select a country / region</option>
                      <option>United States</option>
                      <option>Russia</option>
                      <option>Tajikistan</option>
                      <option>Uzbekistan</option>
                      <option>Germany</option>
                      <option>United Kingdom</option>
                    </select>
                    <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Town / City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-green-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="streetAddress"
                    placeholder="House number and street name"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-800 outline-none placeholder-slate-400 transition focus:border-green-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 opacity-0 hidden sm:block">
                    Appartment
                  </label>
                  <input
                    type="text"
                    name="apartment"
                    placeholder="Appartment, suite, unit, etc. (optional)"
                    value={formData.apartment}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-800 outline-none placeholder-slate-400 transition focus:border-green-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:border-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    State <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-1.5">
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3.5 py-2 pr-8 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-green-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-green-500"
                    >
                      <option>Select a state</option>
                      <option>California</option>
                      <option>New York</option>
                      <option>Texas</option>
                      <option>Florida</option>
                      <option>Washington</option>
                    </select>
                    <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Zip <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-green-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-green-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1.5 flex gap-2">
                    <select
                      name="phoneCode"
                      value={formData.phoneCode}
                      onChange={handleChange}
                      className="w-24 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-green-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-green-500"
                    >
                      <option>+966</option>
                      <option>+1</option>
                      <option>+7</option>
                      <option>+992</option>
                      <option>+998</option>
                    </select>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="flex-1 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-green-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <label className="inline-flex cursor-pointer items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={shipDifferent}
                    onChange={(e) => setShipDifferent(e.target.checked)}
                    className="h-4 w-4 rounded accent-green-500"
                  />
                  <span>Ship to a different address?</span>
                </label>
              </div>

              <div className="pt-2">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Order notes (optional)
                </label>
                <textarea
                  rows={5}
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white p-3 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-green-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-green-500"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Your Order
            </h2>

            <div className="mt-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-300">
                <span>Products</span>
                <span>Subtotal</span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3.5 gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-50 p-1 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                        <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="truncate text-xs sm:text-sm font-semibold text-slate-800 dark:text-white">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          SKU: {item.sku || `199575187${item.id}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-slate-400">
                        (x {item.quantity})
                      </span>
                      <span className="w-16 text-right text-xs sm:text-sm font-bold text-green-600 dark:text-green-400">
                        ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 text-right">
                <button
                  type="button"
                  onClick={() => setShowCouponInput(!showCouponInput)}
                  className="text-xs text-slate-500 dark:text-slate-400"
                >
                  Have a coupon code?{" "}
                  <span className="font-semibold text-green-600 hover:underline dark:text-green-400">
                    Click here
                  </span>
                </button>

                {showCouponInput && (
                  <div className="mt-2 flex overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
                    <input
                      type="text"
                      placeholder="Enter coupon code..."
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="min-w-0 flex-1 px-3 py-1.5 text-xs text-slate-800 outline-none dark:text-white bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="bg-green-500 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-green-600"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponMessage && (
                  <p className="mt-1 text-[11px] font-medium text-green-600 dark:text-green-400">
                    {couponMessage}
                  </p>
                )}
              </div>

              <div className="mt-6 space-y-3 text-xs sm:text-sm border-t border-slate-100 pt-4 dark:border-slate-800">
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

                <div className="flex flex-col gap-0.5 text-slate-600 dark:text-slate-400">
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

              <div className="mt-6">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Payment Method
                </h3>

                <div className="mt-3 space-y-2.5">
                  <label
                    onClick={() => setPaymentMethod("card")}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition ${
                      paymentMethod === "card"
                        ? "border-green-500 bg-green-50/40 dark:bg-green-950/20"
                        : "border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                          paymentMethod === "card"
                            ? "border-green-500"
                            : "border-slate-300 dark:border-slate-600"
                        }`}
                      >
                        {paymentMethod === "card" && (
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                        )}
                      </span>
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        Online Payment
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-extrabold italic text-blue-800 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-blue-400">
                        PayPal
                      </span>
                      <span className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-bold text-red-600 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-red-400">
                        MasterCard
                      </span>
                      <span className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-extrabold text-blue-600 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-blue-300">
                        VISA
                      </span>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod("bank")}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition ${
                      paymentMethod === "bank"
                        ? "border-green-500 bg-green-50/40 dark:bg-green-950/20"
                        : "border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                          paymentMethod === "bank"
                            ? "border-green-500"
                            : "border-slate-300 dark:border-slate-600"
                        }`}
                      >
                        {paymentMethod === "bank" && (
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                        )}
                      </span>
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        Dorect bank transfer
                      </span>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition ${
                      paymentMethod === "cod"
                        ? "border-green-500 bg-green-50/40 dark:bg-green-950/20"
                        : "border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                          paymentMethod === "cod"
                            ? "border-green-500"
                            : "border-slate-300 dark:border-slate-600"
                        }`}
                      >
                        {paymentMethod === "cod" && (
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                        )}
                      </span>
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        Cash on delivery
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-green-500 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-green-500/20 transition hover:bg-green-600 active:scale-95"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>

      {orderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <button
              onClick={() => setOrderModalOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-full text-green-600 transition hover:bg-green-100/50 dark:text-green-400 dark:hover:bg-green-950/50"
            >
              <FiX className="h-5 w-5" />
            </button>

            <div className="border-b border-green-100/80 bg-green-50/70 p-6 text-center dark:border-green-900/40 dark:bg-green-950/30">
              <img
                src={thankYouImg}
                alt="Thank you"
                className="mx-auto h-16 w-16 object-contain"
              />
              <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                Your order has been received
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 border-b border-slate-100 px-4 py-3 text-left sm:text-center dark:divide-slate-800 dark:border-slate-800">
              <div className="p-2 sm:p-0">
                <span className="block text-[11px] text-slate-400">Order Number</span>
                <p className="mt-0.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
                  19586687
                </p>
              </div>
              <div className="p-2 sm:p-0">
                <span className="block text-[11px] text-slate-400">Date</span>
                <p className="mt-0.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
                  15 Sep, 2021
                </p>
              </div>
              <div className="p-2 sm:p-0">
                <span className="block text-[11px] text-slate-400">Total</span>
                <p className="mt-0.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
                  {grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-2 sm:p-0">
                <span className="block text-[11px] text-slate-400">Payment Method</span>
                <p className="mt-0.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
                  Cash on delivery
                </p>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                Order Details
              </h3>

              <div className="mt-2.5 flex items-center justify-between border-b border-slate-100 pb-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-300">
                <span>Products</span>
                <span className="pr-4 sm:pr-8">Qty</span>
                <span>Subtotal</span>
              </div>

              <div className="mt-2 max-h-52 space-y-2 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg bg-slate-50/70 p-2 dark:bg-slate-800/40"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-12 w-12 shrink-0 rounded-lg border border-slate-100 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="truncate text-xs sm:text-sm font-semibold text-slate-800 dark:text-white">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          SKU: {item.sku || `199575187${item.id}`}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 shrink-0">
                      (x {item.quantity})
                    </div>

                    <div className="text-xs sm:text-sm font-bold text-green-600 dark:text-green-400 shrink-0">
                      ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 border-b border-slate-100 pb-4 text-xs sm:text-sm dark:border-slate-800">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>Shiping</span>
                  <span className="font-bold text-slate-800 dark:text-white">$16.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-white">Total</span>
                  <span className="text-base font-extrabold text-green-600 dark:text-green-400">
                    ${grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-center text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Your order is currently being processed. You will receive an order confirmation email shortly with the expected delivery date for your items.
              </p>

              <div className="mt-5 flex justify-center">
                <button
                  onClick={handleFinishOrder}
                  className="rounded-md bg-green-500 px-8 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-green-600 active:scale-95"
                >
                  Track your order
                </button>
              </div>
            </div>

            <div className="h-2.5 w-full bg-green-500" />
          </div>
        </div>
      )}

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

export default Prodduct

