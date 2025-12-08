import React from "react";
import { Sparkles, Car as CarIcon, TrendingUp } from "lucide-react";
import CarCard from "../../components/ui/CarCard";

const CarListing = ({ cars, onAddToCart }) => {
  return (
    <div className="w-full min-h-[calc(100vh-180px)] bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full px-5 py-2.5 mb-6 backdrop-blur-sm shadow-lg shadow-blue-500/20">
            <Sparkles size={18} className="text-blue-400 animate-pulse" />
            <span className="text-sm text-blue-300 font-semibold tracking-wide">Premium Collection 2024-2025</span>
            <TrendingUp size={16} className="text-purple-400" />
          </div>

          {/* Main Title */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 mb-6 tracking-tight">
            Luxury Vehicles
          </h2>

          {/* Subtitle */}
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Discover our handpicked selection of <span className="text-blue-400 font-semibold">premium vehicles</span>. 
            Each car is carefully inspected, certified, and ready for immediate delivery.
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-slate-400">
              <CarIcon size={20} className="text-blue-400" />
              <span className="text-sm font-medium">{cars.length} Available</span>
            </div>
            <div className="w-px h-6 bg-slate-700"></div>
            <div className="text-sm text-slate-400">
              <span className="text-green-400 font-semibold">✓</span> Certified Pre-Owned
            </div>
            <div className="w-px h-6 bg-slate-700"></div>
            <div className="text-sm text-slate-400">
              <span className="text-blue-400 font-semibold">★</span> Premium Quality
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        {cars.length === 0 ? (
          <div className="text-center py-32">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800/50 border border-slate-700 mb-6">
              <CarIcon size={32} className="text-slate-600" />
            </div>
            <div className="text-slate-400 text-xl font-medium mb-2">No vehicles found</div>
            <p className="text-slate-600 text-sm">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} onAddToCart={onAddToCart} />
              ))}
            </div>

            {/* Enhanced Results Count */}
            <div className="text-center mt-16">
              <div className="inline-flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-slate-300 text-sm font-medium">
                  Showing <span className="text-blue-400 font-bold">{cars.length}</span> {cars.length === 1 ? 'vehicle' : 'vehicles'}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CarListing;
