// =============================================================================
// PerformanceOptimizationDemo.tsx
// Demo useMemo + useCallback + React.memo
//
// Cara tes:
// 1. Ketik di kolom search
//    → "Filter dihitung ulang" muncul di Console
//
// 2. Klik "Ganti Tema"
//    → "Filter dihitung ulang" TIDAK muncul
//    → "ProductRow digambar" TIDAK muncul
//
// Artinya:
// - useMemo menyimpan hasil filtering
// - useCallback menjaga referensi function
// - React.memo mencegah ProductRow render ulang jika props tidak berubah
// =============================================================================

import React, { useState, useMemo, useCallback } from "react";

interface Item {
  id: number;
  title: string;
  price: number;
}

const products: Item[] = [
  {
    id: 1,
    title: "Kopi Kapal Api",
    price: 3000,
  },
  {
    id: 2,
    title: "Kopi Kapucino",
    price: 2500,
  },
  {
    id: 3,
    title: "Kopi Luwak White Coffee",
    price: 1500,
  },
];

const ProductRow = React.memo(
  ({ item, onSelect }: { item: Item; onSelect: (title: string) => void }) => {
    console.log(`ProductRow "${item.title}" digambar`);

    return (
      <div className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600">
        <div className="flex items-center gap-4">
          {/* Product Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-xl dark:bg-amber-900/40">
            ☕
          </div>

          {/* Product Info */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {item.title}
            </h3>

            <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Rp {item.price.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* Select Button */}
        <button
          type="button"
          onClick={() => onSelect(item.title)}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus:ring-slate-500 dark:focus:ring-offset-slate-900"
        >
          Pilih
        </button>
      </div>
    );
  }
);

ProductRow.displayName = "ProductRow";

export default function PerformanceOptimizationDemo() {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // ===========================================================================
  // 1. useMemo
  //
  // Filter hanya dihitung ulang ketika "search" berubah.
  // Ketika theme berubah, hasil filter tetap menggunakan value sebelumnya.
  // ===========================================================================

  const filteredProducts = useMemo(() => {
    console.log("Filter dihitung ulang...");

    return products.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // ===========================================================================
  // 2. useCallback
  //
  // Menjaga agar referensi function handleSelect tetap sama
  // selama dependency [] tidak berubah.
  //
  // Ini penting karena ProductRow menggunakan React.memo.
  // ===========================================================================

  const handleSelect = useCallback((title: string) => {
    console.log(`Produk dipilih: ${title}`);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }, []);

  const isDark = theme === "dark";

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-950" : "bg-slate-100"
      }`}
    >
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Performance Optimization
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1
                className={`text-3xl font-bold tracking-tight ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Katalog Produk
              </h1>

              <p
                className={`mt-2 text-sm ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Demo useMemo, useCallback, dan React.memo
              </p>
            </div>

            {/* Theme Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
                isDark
                  ? "border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                  : "border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50"
              }`}
            >
              <span>{isDark ? "☀️" : "🌙"}</span>
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>

        {/* Search Card */}
        <div
          className={`mb-6 rounded-2xl border p-4 shadow-sm ${
            isDark
              ? "border-slate-800 bg-slate-900"
              : "border-slate-200 bg-white"
          }`}
        >
          <label
            htmlFor="product-search"
            className={`mb-2 block text-sm font-medium ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Cari produk
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg">
              🔍
            </span>

            <input
              id="product-search"
              type="text"
              placeholder="Cari kopi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full rounded-xl border py-3 pl-10 pr-4 text-sm outline-none transition-all ${
                isDark
                  ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
              }`}
            />
          </div>
        </div>

        {/* Product List */}
        <div className="space-y-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductRow key={item.id} item={item} onSelect={handleSelect} />
            ))
          ) : (
            <div
              className={`rounded-2xl border p-10 text-center ${
                isDark
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="mb-3 text-4xl">🔎</div>

              <h3
                className={`font-semibold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Produk tidak ditemukan
              </h3>

              <p
                className={`mt-1 text-sm ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Coba gunakan kata kunci pencarian yang berbeda.
              </p>
            </div>
          )}
        </div>

        {/* Result Info */}
        <div className="mt-5 flex items-center justify-between">
          <p
            className={`text-sm ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            {filteredProducts.length} produk ditemukan
          </p>

          <p
            className={`text-xs ${
              isDark ? "text-slate-600" : "text-slate-400"
            }`}
          >
            useMemo + useCallback + React.memo
          </p>
        </div>
      </div>
    </main>
  );
}
