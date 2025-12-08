import React from "react";
import { ShoppingCart, Calendar, Gauge } from "lucide-react";

const CarCard = ({ car, onAddToCart }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-700/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 hover:border-blue-500/50">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-slate-900">
        <img
          src={car.image}
          alt={car.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200';
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        
        {/* Year Badge */}
        <div className="absolute top-3 right-3 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <Calendar size={12} />
          {car.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Brand */}
        <div className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
          {car.brand}
        </div>

        {/* Car Name */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-300 transition-colors">
          {car.name}
        </h3>

        {/* Specs */}
        <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
          <Gauge size={14} />
          <span className="line-clamp-1">{car.specs}</span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 mb-1">Starting at</div>
            <div className="text-2xl font-bold text-blue-400">
              ${car.price.toLocaleString()}
            </div>
          </div>

          <button
            onClick={() => onAddToCart(car)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
      </div>
    </div>
  );
};

export default CarCard;
