import React from "react";

const CarCard = ({ car, onAddToCart }) => {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-blue-700/30">
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white">{car.name}</h3>
        <p className="text-slate-400 text-sm mt-1">{car.brand}</p>
        <p className="text-blue-400 font-bold text-lg mt-2">
          ${car.price.toLocaleString()}
        </p>
        <p className="text-slate-500 text-xs">Year: {car.year}</p>

        <button
          onClick={() => onAddToCart(car)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-medium transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CarCard;
