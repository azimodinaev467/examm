import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router"
import { useTranslation } from "react-i18next"
import axios from "axios"
import { api } from "../api/auth"
import {
    FiShoppingCart,
    FiLogOut,
    FiHeart,
    FiSearch,
    FiMinus,
    FiPlus,
    FiChevronLeft,
    FiChevronRight,
    FiMapPin,
    FiMail,
    FiPhoneCall,
    FiStar,
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

import img1 from "../assets/4575e3df52fa214db1f3ce519277860c13b11e21.png"
import img2 from "../assets/5219e659b8a1d488abd136ce27f86ab3da3ceb37.png"
import img3 from "../assets/586c85231ab58d21463d86aa3768f5c6c78f8a1f.png"
import img4 from "../assets/7c597aa91ee5df5d1fd65d8184246c0c9918f920.png"
import img5 from "../assets/9531c63d3f618aefdf1ccb10a5aa0e2d00f45d0b.png"
import img6 from "../assets/9957e153a59c050946e77e8fc7e11525e87c4678.png"
import plantHero from "../assets/plant-hero.png"

import footerPlant1 from "../assets/1e460c89ee17b2b09a69f96d2552ed3b0b04ac05.png"
import footerPlant2 from "../assets/Group 18.png"
import footerPlant3 from "../assets/Group 19.png"

const plantImages = [img3, img4, img1, img2, img5, img6, plantHero]

const sizes = ["S", "M", "L", "XL"]

const Info = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const { id = 1 } = useParams()
    const token = localStorage.getItem("token")

    const navLinks = [
        { label: t("nav.home"), href: "/" },
        { label: t("nav.shop"), href: "/" },
        { label: t("nav.plantCare"), href: "/" },
        { label: t("nav.blogs"), href: "/" },
    ]

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedImg, setSelectedImg] = useState(0)
    const [selectedSize, setSelectedSize] = useState("S")
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState("description")
    const [isWishlist, setIsWishlist] = useState(false)
    const [wishlistCount, setWishlistCount] = useState(0)
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
    const [relatedProducts, setRelatedProducts] = useState([])

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login", { replace: true })
    }

    const handleAddToCart = () => {
        try {
            const stored = JSON.parse(localStorage.getItem("cart") || "[]")
            const prodId = product?.id || id
            const existing = stored.find((item) => String(item.id) === String(prodId))
            let next
            if (existing) {
                next = stored.map((item) =>
                    String(item.id) === String(prodId)
                        ? { ...item, quantity: (item.quantity || 1) + quantity }
                        : item
                )
            } else {
                next = [
                    ...stored,
                    {
                        id: prodId,
                        name: product?.name || "Barberton Daisy",
                        sku: `199575187796${prodId}`,
                        price: product?.price || 119,
                        quantity: quantity,
                        image: currentMainImage || plantImages[0],
                    },
                ]
            }
            localStorage.setItem("cart", JSON.stringify(next))
            setCartCount(next.reduce((acc, item) => acc + (item.quantity || 1), 0))
        } catch (e) {
            console.error(e)
        }
    }

    const checkWishlistStatus = () => {
        try {
            const stored = JSON.parse(localStorage.getItem("wishlist") || "[]")
            setWishlistCount(stored.length)
            setIsWishlist(stored.some((item) => (typeof item === "object" ? String(item.id) === String(id) : String(item) === String(id))))
        } catch {
            setIsWishlist(false)
        }
    }

    const toggleWishlist = () => {
        try {
            const stored = JSON.parse(localStorage.getItem("wishlist") || "[]")
            const exists = stored.some((item) => (typeof item === "object" ? String(item.id) === String(id) : String(item) === String(id)))
            let next
            if (exists) {
                next = stored.filter((item) => (typeof item === "object" ? String(item.id) !== String(id) : String(item) !== String(id)))
                setIsWishlist(false)
            } else {
                next = [
                    ...stored,
                    {
                        id: product?.id || id,
                        name: product?.name || "Barberton Daisy",
                        price: product?.price || 119,
                        image: currentMainImage || plantImages[0],
                        discount: product?.discount || false,
                    },
                ]
                setIsWishlist(true)
            }
            localStorage.setItem("wishlist", JSON.stringify(next))
            setWishlistCount(next.length)
        } catch (e) {
            console.error(e)
        }
    }

    const GetProduct = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${api}/products/${id}`, {
                headers: { Authorization: "Bearer " + token },
            })
            setProduct(data)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const GetRelated = async () => {
        try {
            const { data } = await axios.get(`${api}/products?limit=5&page=1`, {
                headers: { Authorization: "Bearer " + token },
            })
            const items = (data?.data || []).map((p, idx) => ({
                ...p,
                image: plantImages[idx % plantImages.length],
            }))
            setRelatedProducts(items)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        GetProduct()
        GetRelated()
        checkWishlistStatus()
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [id])

    const galleryImages = [
        plantImages[Number(id || 1) % plantImages.length],
        img4,
        img1,
        img2,
    ]

    const currentMainImage = galleryImages[selectedImg] || galleryImages[0]

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
                                    className={`relative pb-1 text-sm font-medium transition ${link.label === "Shop"
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
                    <span className="text-slate-500 dark:text-slate-400">{t("nav.shop")}</span>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 animate-pulse">
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-20 w-20 rounded-xl bg-slate-100 dark:bg-slate-800" />
                                ))}
                            </div>
                            <div className="h-96 flex-1 rounded-2xl bg-slate-100 dark:bg-slate-800" />
                        </div>
                        <div className="space-y-4">
                            <div className="h-8 w-2/3 rounded-lg bg-slate-100 dark:bg-slate-800" />
                            <div className="h-6 w-1/4 rounded-lg bg-slate-100 dark:bg-slate-800" />
                            <div className="h-24 w-full rounded-lg bg-slate-100 dark:bg-slate-800" />
                            <div className="h-10 w-1/3 rounded-lg bg-slate-100 dark:bg-slate-800" />
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
                        <div className="flex flex-col-reverse sm:flex-row gap-4 items-start">
                            <div className="flex sm:flex-col gap-3 w-full sm:w-24 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
                                {galleryImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImg(idx)}
                                        className={`h-20 w-20 shrink-0 rounded-xl border bg-slate-50 p-2 transition dark:bg-slate-900 ${selectedImg === idx
                                                ? "border-green-500 ring-2 ring-green-500/20"
                                                : "border-slate-200 hover:border-slate-300 dark:border-slate-800"
                                            }`}
                                    >
                                        <img src={img} alt="thumbnail" className="h-full w-full object-contain" />
                                    </button>
                                ))}
                            </div>

                            <div className="relative flex-1 w-full flex items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/60 p-6 min-h-[380px] sm:min-h-[440px] dark:border-slate-800 dark:bg-slate-900/60">
                                <button className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition hover:text-green-600 dark:bg-slate-800 dark:text-slate-300">
                                    <FiSearch className="h-4 w-4" />
                                </button>
                                <img
                                    src={currentMainImage}
                                    alt={product?.name || "Product"}
                                    className="max-h-[340px] w-auto object-contain drop-shadow-xl transition duration-300 hover:scale-105"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col justify-start">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                                {product?.name || "Barberton Daisy"}
                            </h1>

                            <div className="mt-3 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                    ${Number(product?.price || 119).toFixed(2)}
                                </p>

                                <div className="flex items-center gap-2">
                                    <div className="flex items-center text-amber-400">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <FiStar key={s} className="h-3.5 w-3.5 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        19 {t("info.customerReview")}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                                    {t("info.shortDescription")}
                                </h4>
                                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                    {product?.description ||
                                        "The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground."}
                                </p>
                            </div>

                            <div className="mt-5">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                                    {t("info.size")}
                                </h4>
                                <div className="mt-2.5 flex items-center gap-2.5">
                                    {sizes.map((sz) => (
                                        <button
                                            key={sz}
                                            onClick={() => setSelectedSize(sz)}
                                            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${selectedSize === sz
                                                    ? "border-2 border-green-500 font-extrabold text-green-600 dark:text-green-400"
                                                    : "border border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300"
                                                }`}
                                        >
                                            {sz}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <div className="flex items-center gap-3 rounded-full bg-slate-50 px-2 py-1 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                    <button
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white transition hover:bg-green-600 active:scale-95"
                                    >
                                        <FiMinus className="h-3.5 w-3.5" />
                                    </button>
                                    <span className="w-5 text-center text-sm font-bold text-slate-800 dark:text-white">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity((q) => q + 1)}
                                        className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white transition hover:bg-green-600 active:scale-95"
                                    >
                                        <FiPlus className="h-3.5 w-3.5" />
                                    </button>
                                </div>

                                <button
                                    onClick={() => {
                                        handleAddToCart()
                                        navigate("/cart")
                                    }}
                                    className="rounded-lg bg-green-500 px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-green-600 active:scale-95"
                                >
                                    {t("info.buyNow")}
                                </button>

                                <button
                                    onClick={handleAddToCart}
                                    className="rounded-lg border border-green-500 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-green-600 transition hover:bg-green-50 active:scale-95 dark:bg-slate-900 dark:text-green-400 dark:hover:bg-slate-800"
                                >
                                    {t("info.addToCart")}
                                </button>

                                <button
                                    onClick={toggleWishlist}
                                    className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${isWishlist
                                            ? "border-red-400 bg-red-50 text-red-500 dark:bg-red-950/40"
                                            : "border-slate-200 text-slate-500 hover:border-red-300 hover:text-red-500 dark:border-slate-700 dark:text-slate-400"
                                        }`}
                                >
                                    <FiHeart className={`h-4 w-4 ${isWishlist ? "fill-current" : ""}`} />
                                </button>
                            </div>

                            <div className="mt-6 space-y-1.5 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                                <p>
                                    <span className="text-slate-400">{t("info.sku")}</span>{" "}
                                    <span className="font-medium text-slate-700 dark:text-slate-200">
                                        {product?.id ? `199575187796${product.id}` : "1995751877966"}
                                    </span>
                                </p>
                                <p>
                                    <span className="text-slate-400">{t("info.categories")}</span>{" "}
                                    <span className="font-medium text-slate-700 dark:text-slate-200">
                                        Potter Plants
                                    </span>
                                </p>
                                <p>
                                    <span className="text-slate-400">{t("info.tags")}</span>{" "}
                                    <span className="font-medium text-slate-700 dark:text-slate-200">
                                        Home, Garden, Plants
                                    </span>
                                </p>
                            </div>

                            <div className="mt-4 flex items-center gap-3 text-xs text-slate-800 dark:text-slate-200">
                                <span className="font-bold">{t("info.share")}</span>
                                <div className="flex items-center gap-2.5">
                                    <FaFacebookF className="h-3.5 w-3.5 cursor-pointer text-slate-600 hover:text-green-600 dark:text-slate-400" />
                                    <FaTwitter className="h-3.5 w-3.5 cursor-pointer text-slate-600 hover:text-green-600 dark:text-slate-400" />
                                    <FaLinkedinIn className="h-3.5 w-3.5 cursor-pointer text-slate-600 hover:text-green-600 dark:text-slate-400" />
                                    <FiMail className="h-3.5 w-3.5 cursor-pointer text-slate-600 hover:text-green-600 dark:text-slate-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-14">
                    <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-800">
                        <button
                            onClick={() => setActiveTab("description")}
                            className={`pb-3 text-sm font-bold transition ${activeTab === "description"
                                    ? "border-b-2 border-green-500 text-green-600 dark:text-green-400"
                                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                                }`}
                        >
                            {t("info.productDescription")}
                        </button>
                        <button
                            onClick={() => setActiveTab("reviews")}
                            className={`pb-3 text-sm font-bold transition ${activeTab === "reviews"
                                    ? "border-b-2 border-green-500 text-green-600 dark:text-green-400"
                                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                                }`}
                        >
                            {t("info.reviews")}
                        </button>
                    </div>

                    <div className="mt-5 space-y-4 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        <p>
                            The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground.
                        </p>
                        <p>
                            Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                        </p>

                        <div>
                            <h4 className="font-bold text-slate-800 dark:text-white">Living Room:</h4>
                            <p className="mt-1">
                                The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-800 dark:text-white">Dining Room:</h4>
                            <p className="mt-1">
                                The benefits of houseplants are endless. In addition to cleaning the air of harmful toxins, they can help improve your mood, reduce stress and provide you with better sleep.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-800 dark:text-white">Office:</h4>
                            <p className="mt-1">
                                The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-slate-100 pt-10 dark:border-slate-800">
                    <h3 className="border-b border-green-500/20 pb-3 text-base font-bold text-green-600 dark:text-green-400">
                        {t("info.relatedProducts")}
                    </h3>

                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                        {relatedProducts.map((rel) => (
                            <div
                                key={rel.id}
                                onClick={() => navigate(`/product/${rel.id}`)}
                                className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex h-36 items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-2 dark:bg-slate-800">
                                    <img
                                        src={rel.image}
                                        alt={rel.name}
                                        className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="mt-2.5">
                                    <p className="truncate text-xs font-semibold text-slate-800 dark:text-white">
                                        {rel.name}
                                    </p>
                                    <p className="mt-1 text-xs font-bold text-green-600 dark:text-green-400">
                                        ${Number(rel.price || 99).toFixed(2)}
                                    </p>
                                </div>
                            </div>
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
                                    We usually post offers and challenges in newsletter. We're your online houseplant destination.
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

export default Info

