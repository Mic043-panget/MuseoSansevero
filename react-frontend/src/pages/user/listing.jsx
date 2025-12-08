import React from "react";
import CarCard from "../../components/ui/CarCard";

const CarListing = ({ cars, onAddToCart }) => {
  return (
    <div className="container mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">
        🚗 Available Cars
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default CarListing;
