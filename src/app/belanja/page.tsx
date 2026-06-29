"use client";

import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, CheckCircle, Plus, Minus, CreditCard, Sparkles, Tag } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

type Product = {
  id: number;
  name: string;
  price: number;
  unit: string;
  category: string;
  producer: string;
  rating: number;
  image?: string;
};

export default function BelanjaPage() {
  const { currentUser, addTransaction } = useAppContext();
  const router = useRouter();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [customAmount, setCustomAmount] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"products" | "custom">("products");
  const [success, setSuccess] = useState<number | null>(null);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    if (!currentUser) router.push("/login");
  }, [currentUser, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (err) {
        console.warn("Gagal mengambil produk dari API, menggunakan data lokal.");
        // Fallback local products
        setProducts([
          { id: 1, name: "Beras Organik Sumberejo", price: 14000, unit: "kg", category: "Pangan", producer: "Tani Sumberejo", rating: 4.8 },
          { id: 2, name: "Gula Kelapa Murni", price: 25000, unit: "kg", category: "Pangan", producer: "PKK Sumberejo", rating: 4.9 },
          { id: 3, name: "Kerajinan Anyaman Bambu", price: 150000, unit: "buah", category: "Kerajinan", producer: "Perajin Sleman", rating: 4.7 },
          { id: 4, name: "Kopi Arabika Merapi", price: 85000, unit: "250gr", category: "Minuman", producer: "Kopi Merapi", rating: 4.9 },
          { id: 5, name: "Madu Hutan Murni", price: 120000, unit: "500ml", category: "Kesehatan", producer: "Lebah Sumberejo", rating: 4.9 },
        ]);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  if (!currentUser) return null;

  const handleAddToCart = (productId: number) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[productId] > 1) {
        copy[productId] -= 1;
      } else {
        delete copy[productId];
      }
      return copy;
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const prod = products.find((p) => p.id === parseInt(id));
      return total + (prod ? prod.price * qty : 0);
    }, 0);
  };

  const handleCheckout = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    let finalAmount = 0;
    if (activeTab === "products") {
      finalAmount = getCartTotal();
    } else {
      finalAmount = parseInt(customAmount.replace(/\D/g, ""), 10);
    }

    if (!finalAmount || finalAmount <= 0) return;

    const basePoints = Math.floor(finalAmount / 1000);
    const pointsEarned = Math.floor(basePoints * currentUser.tier.multiplier);

    await addTransaction(finalAmount);
    setSuccess(pointsEarned);
    
    // Reset states
    setCart({});
    setCustomAmount("");

    setTimeout(() => setSuccess(null), 3000);
  };

  const formatRupiah = (val: string) => {
    const numberString = val.replace(/[^,\d]/g, "").toString();
    const split = numberString.split(",");
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    return rupiah ? rupiah : "";
  };

  const cartTotal = getCartTotal();
  const hasCartItems = Object.keys(cart).length > 0;
  const multiplier = currentUser.tier.multiplier;

  return (
    <div className="page-container pb-28">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4 sticky top-0 z-10 border-b border-gray-100">
        <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-xl transition">
          <ArrowLeft size={20} className="text-gray-700" />
        </Link>
        <h1 className="font-extrabold text-lg text-[#3a3a3a] flex-1">Simulasi Belanja</h1>
        <div className="relative">
          <ShoppingCart size={22} className="text-[#463cd8]" />
          {hasCartItems && (
            <span className="absolute -top-1.5 -right-1.5 bg-yellow-500 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse-glow">
              {Object.values(cart).reduce((a, b) => a + b, 0)}
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-5 mt-4 gap-2">
        <button
          onClick={() => setActiveTab("products")}
          className="flex-1 py-3 text-sm font-bold rounded-xl transition border-2"
          style={{
            borderColor: activeTab === "products" ? "#463cd8" : "transparent",
            background: activeTab === "products" ? "#e8f5e9" : "white",
            color: activeTab === "products" ? "#463cd8" : "#6b7280",
          }}
        >
          📦 Produk Unggulan
        </button>
        <button
          onClick={() => setActiveTab("custom")}
          className="flex-1 py-3 text-sm font-bold rounded-xl transition border-2"
          style={{
            borderColor: activeTab === "custom" ? "#463cd8" : "transparent",
            background: activeTab === "custom" ? "#e8f5e9" : "white",
            color: activeTab === "custom" ? "#463cd8" : "#6b7280",
          }}
        >
          ✏️ Input Manual
        </button>
      </div>

      {/* Main Container */}
      <div className="px-5 mt-5">
        {activeTab === "products" ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={16} className="text-yellow-500" />
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Komoditas & Produk Desa</p>
            </div>

            {loadingProducts ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full" style={{ borderWidth: 3, animation: "spin-slow 0.8s linear infinite" }} />
                <p className="text-sm text-gray-500">Memuat katalog...</p>
              </div>
            ) : (
              <div className="space-y-3 stagger">
                {products.map((product) => {
                  const qty = cart[product.id] || 0;
                  return (
                    <div key={product.id} className="kop-card p-4 flex gap-4 items-center">
                      {/* Product Thumbnail */}
                      <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center text-3xl flex-shrink-0 relative border border-gray-100">
                        {product.category === "Pangan" && "🌾"}
                        {product.category === "Kerajinan" && "🎋"}
                        {product.category === "Minuman" && "☕"}
                        {product.category === "Kesehatan" && "🍯"}
                        {!["Pangan", "Kerajinan", "Minuman", "Kesehatan"].includes(product.category) && "📦"}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full inline-block mb-1">
                          {product.category}
                        </span>
                        <h4 className="font-bold text-[#3a3a3a] text-sm truncate">{product.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Oleh: {product.producer}</p>
                        <p className="text-sm font-extrabold text-[#3a3a3a] mt-1">
                          Rp {product.price.toLocaleString("id-ID")}<span className="text-[10px] text-gray-400 font-normal"> / {product.unit}</span>
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex-shrink-0 flex items-center gap-2">
                        {qty > 0 ? (
                          <>
                            <button
                              onClick={() => handleRemoveFromCart(product.id)}
                              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 font-bold transition active:scale-90"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-extrabold text-sm text-[#3a3a3a] w-4 text-center">{qty}</span>
                          </>
                        ) : null}
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className="w-8 h-8 rounded-lg bg-indigo-700 hover:bg-indigo-800 flex items-center justify-center text-white font-bold transition active:scale-90"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="kop-card p-6">
            <h3 className="font-bold text-[#3a3a3a] text-base mb-2">Belanja Langsung</h3>
            <p className="text-xs text-gray-500 mb-6">
              Gunakan formulir ini untuk merekam transaksi yang dilakukan langsung di toko offline koperasi.
            </p>

            <form onSubmit={handleCheckout}>
              <div className="mb-6 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">Rp</span>
                <input
                  type="text"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(formatRupiah(e.target.value))}
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-2xl font-extrabold text-[#3a3a3a] focus:outline-none focus:border-indigo-700 transition"
                  placeholder="0"
                  required
                />
              </div>

              {/* Point Estimator Card */}
              {customAmount && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-yellow-600" />
                    <span className="text-xs font-bold text-gray-700">Estimasi Poin (x{multiplier}):</span>
                  </div>
                  <span className="font-extrabold text-base text-[#463cd8]">
                    +{Math.floor(Math.floor(parseInt(customAmount.replace(/\D/g, "") || "0", 10) / 1000) * multiplier)} Pts
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={!customAmount}
                className="btn-primary"
              >
                Proses Transaksi Offline
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Bottom Sticky Checkout summary for Products tab */}
      {activeTab === "products" && hasCartItems && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[428px] bg-white border-t border-gray-100 p-5 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-40 rounded-t-3xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-xs text-gray-400 font-medium">Total Pembelanjaan</p>
              <h3 className="text-xl font-extrabold text-[#3a3a3a]">
                Rp {cartTotal.toLocaleString("id-ID")}
              </h3>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-bold bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
                <Tag size={12} />
                <span>+{Math.floor(Math.floor(cartTotal / 1000) * multiplier)} Poin</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">Multiplier {multiplier}× aktif</p>
            </div>
          </div>
          <button
            onClick={() => handleCheckout()}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <CreditCard size={18} />
            <span>Bayar & Rekam Transaksi</span>
          </button>
        </div>
      )}

      {/* Success Toast */}
      {success !== null && (
        <div className="toast">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
              <CheckCircle size={28} />
            </div>
            <div>
              <p className="font-extrabold text-[#3a3a3a] text-sm">Transaksi Berhasil direkam!</p>
              <p className="text-xs font-bold text-[#463cd8] mt-0.5">+{success.toLocaleString("id-ID")} Poin partisipasi telah ditambahkan.</p>
            </div>
          </div>
        </div>
      )}

      <BottomNav active="/belanja" />
    </div>
  );
}

function BottomNav({ active }: { active: string }) {
  const items = [
    { href: "/dashboard", icon: "🏠", label: "Beranda" },
    { href: "/belanja", icon: "🛒", label: "Belanja" },
    { href: "/misi", icon: "🎯", label: "Misi" },
    { href: "/leaderboard", icon: "🏆", label: "Ranking" },
    { href: "/profile", icon: "👤", label: "Profil" },
  ];
  return (
    <nav className="bottom-nav">
      <div className="flex justify-around items-center px-2">
        {items.map((item) => {
          const isActive = active === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all"
              style={{ minWidth: 52 }}
            >
              <span className="text-xl" style={{ filter: isActive ? "drop-shadow(0 0 8px rgba(26,92,42,0.5))" : "none", transform: isActive ? "scale(1.2)" : "scale(1)", transition: "all 0.2s" }}>
                {item.icon}
              </span>
              <span className="text-[10px] font-bold" style={{ color: isActive ? "#463cd8" : "#9ca3af" }}>
                {item.label}
              </span>
              {isActive && <div className="w-1 h-1 rounded-full bg-indigo-600" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
