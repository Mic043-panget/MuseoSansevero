import React from "react";
import { ShoppingCart } from "lucide-react";

export default function Navbar({ setCurrentPage, currentPage, cartCount }) {
  return (
    <nav className="flex items-center justify-between bg-indigo-700 px-8 py-4 shadow-lg">
      <h1 className="text-2xl font-bold">🚗 Premium Auto</h1>
      <div className="space-x-6">
        <button
          onClick={() => setCurrentPage("landing")}
          className={`hover:text-yellow-300 ${
            currentPage === "landing" && "text-yellow-300"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setCurrentPage("cars")}
          className={`hover:text-yellow-300 ${
            currentPage === "cars" && "text-yellow-300"
          }`}
        >
          Car Listing
        </button>
        <button
          onClick={() => setCurrentPage("order")}
          className={`hover:text-yellow-300 ${
            currentPage === "order" && "text-yellow-300"
          }`}
        >
          Order
        </button>
        <span className="relative inline-flex items-center">
          <ShoppingCart className="ml-4" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </span>
      </div>
    </nav>
  );
}
