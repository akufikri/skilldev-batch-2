"use client";
import Link from "next/link";

export function Navbar() {
  return (
    <>
      <nav className="flex gap-4 p-4 bg-zinc-900 text-white sticky top-0 z-50">
        <Link href={"/dashboard"}>Dashboard</Link>
        <Link href={"/dashboard/products"}>Products</Link>
        <Link href={"/dashboard/analytics"}>Analytics</Link>
      </nav>
    </>
  );
}
