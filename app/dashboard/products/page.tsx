import React from "react";
import ProductCatalog from "@/components/ProductCatalog";
import { CounterItemButton } from "@/components/CounterItemButton";

export default async function Products() {
  const res = await fetch("https://dummyjson.com/products?limit=1");
  const data = await res.json();
  const featuredProduct = data.products[0];
  return (
    <>
      <div className="p-2 space-y-6">
        <header>
          <h1 className="text-3xl font-bold">Manajemen Menu Kasir</h1>
        </header>

        <div>
          <ProductCatalog />
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex justify-between items-center">
          <div>
            <h3 className="font-bold text-blue-900">
              Produk unggulan hari ini
            </h3>
            <p className="text-sm text-blue-700">{featuredProduct.title}</p>
          </div>
          <CounterItemButton />
        </div>
      </div>
    </>
  );
}
