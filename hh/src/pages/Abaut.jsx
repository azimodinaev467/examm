
import {
  FiShoppingCart,
  FiHeart,
  FiLogOut,
  FiUser,
  FiMapPin,
  FiDownload,
  FiHeadphones,
  FiFileText,
  FiPower,
} from "react-icons/fi"

import Logo from "../assets/Logo.png"
import ThemeToggle from "../components/ThemeToggle"
import LanguageToggle from "../components/LanguageToggle"

const Address = () => {
  const menu = [
    { name: "Account Details", icon: FiUser },
    { name: "Address", icon: FiMapPin },
    { name: "Orders", icon: FiShoppingCart },
    { name: "Wishlist", icon: FiHeart },
    { name: "Reports", icon: FiFileText },
    { name: "Downloads", icon: FiDownload },
    { name: "Support", icon: FiHeadphones },
  ]

  const Field = ({ label, placeholder = "", required = false }) => (
    <div>
      <label className="mb-2 block text-xs font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        className="h-10 w-full rounded-sm border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-500"
      />
    </div>
  )

  const SelectField = ({ label, placeholder }) => (
    <div>
      <label className="mb-2 block text-xs font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>

      <select className="h-10 w-full rounded-sm border border-gray-200 bg-white px-3 text-xs text-gray-400 outline-none focus:border-green-500">
        <option>{placeholder}</option>
      </select>
    </div>
  )

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8 lg:px-10">

          <img
            src={Logo}
            alt="GreenShop"
            className="h-8 w-auto object-contain"
          />

          <nav className="hidden items-center gap-8 md:flex">
            {["Home", "Shop", "Plant Care", "Blogs"].map((item) => (
              <span
                key={item}
                className="cursor-pointer text-xs text-gray-600 transition hover:text-green-600"
              >
                {item}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-3">

            <FiHeart className="cursor-pointer text-gray-600" size={17} />

            <div className="relative cursor-pointer">
              <FiShoppingCart className="text-gray-600" size={17} />
              <span className="absolute -right-2 -top-2 h-2 w-2 rounded-full bg-green-500" />
            </div>

            <div className="hidden h-5 w-px bg-gray-200 sm:block" />

            <LanguageToggle />
            <ThemeToggle />

            <button className="flex items-center gap-1.5 rounded-md bg-green-600 px-4 py-2 text-xs font-medium text-white">
              <FiLogOut size={13} />
              Login
            </button>

          </div>
        </div>
      </header>

      <main className="mx-auto min-h-[650px] max-w-7xl px-4 py-8 sm:px-8 lg:px-10 lg:py-10">

        <div className="grid grid-cols-1 gap-7 md:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">

          <aside>
            <div className="bg-gray-50">

              <h3 className="px-4 py-4 text-sm font-bold text-gray-800">
                My Account
              </h3>

              <div className="space-y-1 pb-3">

                {menu.map((item) => {
                  const Icon = item.icon

                  return (
                    <div
                      key={item.name}
                      className={`relative flex cursor-pointer items-center gap-3 px-4 py-2 text-xs transition ${
                        item.name === "Address"
                          ? "font-semibold text-green-600"
                          : "text-gray-500 hover:text-green-600"
                      }`}
                    >
                      {item.name === "Address" && (
                        <span className="absolute left-0 top-0 h-full w-[2px] bg-green-600" />
                      )}

                      <Icon size={14} />
                      {item.name}
                    </div>
                  )
                })}

                <div className="flex cursor-pointer items-center gap-3 px-4 py-3 text-xs font-semibold text-green-600">
                  <FiPower size={14} />
                  Logout
                </div>

              </div>
            </div>
          </aside>

          <section className="min-w-0">

            <div>

              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-gray-800">
                    Billing Address
                  </h2>

                  <p className="mt-1 text-[11px] text-gray-400">
                    The following addresses will be used on the checkout page by default.
                  </p>
                </div>

                <span className="cursor-pointer text-xs font-medium text-green-600">
                  Add
                </span>
              </div>

              <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">

                <Field label="First Name" required />
                <Field label="Last Name" required />

                <SelectField
                  label="Country / Region"
                  placeholder="Select a country / region"
                />

                <Field label="Town / City" required />

                <Field
                  label="Street Address"
                  placeholder="House number and street name"
                  required
                />

                <Field
                  label="Apartment"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                />

                <SelectField
                  label="State"
                  placeholder="Select a state"
                />

                <Field label="Zip" required />

                <Field label="Email address" required />

                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>

                  <div className="flex gap-2">
                    <select className="h-10 w-[75px] rounded-sm border border-gray-200 bg-white px-2 text-xs outline-none">
                      <option>+966</option>
                    </select>

                    <input
                      type="text"
                      className="h-10 min-w-0 flex-1 rounded-sm border border-gray-200 px-3 text-xs outline-none focus:border-green-500"
                    />
                  </div>
                </div>

              </div>

              <button className="mt-7 rounded-sm bg-green-600 px-5 py-3 text-xs font-semibold text-white transition hover:bg-green-700">
                Save Address
              </button>

            </div>

            <div className="mt-10 border-t border-gray-100 pt-7">

              <div className="flex flex-wrap items-center justify-between gap-3">

                <div>
                  <h2 className="text-sm font-semibold text-gray-800">
                    Shipping Address
                  </h2>

                  <p className="mt-1 text-[11px] text-gray-400">
                    You have not set up this type of address yet.
                  </p>
                </div>

                <div className="flex items-center gap-5">

                  <label className="flex cursor-pointer items-center gap-2 text-[11px] text-gray-600">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-3.5 w-3.5 accent-green-600"
                    />
                    Same as billing address
                  </label>

                  <span className="cursor-pointer text-xs font-medium text-green-600">
                    Add
                  </span>

                </div>

              </div>

            </div>

          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-10 border-t border-gray-100 bg-gray-50">

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10">

          <div>
            <h3 className="mb-4 text-sm font-bold text-gray-800">
              My Account
            </h3>

            <ul className="space-y-3 text-xs text-gray-500">
              <li>My Account</li>
              <li>Our Stores</li>
              <li>Contact Us</li>
              <li>Career</li>
              <li>Specials</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-gray-800">
              Help & Guide
            </h3>

            <ul className="space-y-3 text-xs text-gray-500">
              <li>Help Center</li>
              <li>How to Buy</li>
              <li>Shipping & Delivery</li>
              <li>Product Policy</li>
              <li>How to Return</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-gray-800">
              Categories
            </h3>

            <ul className="space-y-3 text-xs text-gray-500">
              <li>House Plants</li>
              <li>Potter Plants</li>
              <li>Seeds</li>
              <li>Small Plants</li>
              <li>Accessories</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-gray-800">
              Social Media
            </h3>

            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
              <span>Facebook</span>
              <span>Instagram</span>
              <span>Twitter</span>
              <span>LinkedIn</span>
            </div>

            <h3 className="mb-3 mt-7 text-sm font-bold text-gray-800">
              We Accept
            </h3>

            <div className="flex flex-wrap gap-2 text-[10px] font-bold">
              <span className="rounded border bg-white px-2 py-1">PayPal</span>
              <span className="rounded border bg-white px-2 py-1">MasterCard</span>
              <span className="rounded border bg-white px-2 py-1">VISA</span>
              <span className="rounded border bg-white px-2 py-1">AMEX</span>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-200 py-5 text-center text-xs text-gray-400">
          © 2026 GreenShop. All Rights Reserved.
        </div>

      </footer>

    </div>
  )
}

export default Address
