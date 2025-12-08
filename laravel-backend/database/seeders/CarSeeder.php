<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cars = [
            ['name' => 'Toyota Corolla', 'price' => 22000, 'image' => 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=1200', 'specs' => '1.8L I4, Compact Sedan', 'year' => 2024, 'brand' => 'Toyota'],
            ['name' => 'Honda Civic', 'price' => 24000, 'image' => 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200', 'specs' => '2.0L I4, Compact', 'year' => 2024, 'brand' => 'Honda'],
            ['name' => 'Mazda CX-5', 'price' => 30000, 'image' => 'https://images.unsplash.com/photo-1549921296-3f9b9e4b6a24?w=1200', 'specs' => '2.5L I4, Compact SUV', 'year' => 2024, 'brand' => 'Mazda'],
            ['name' => 'Ford Ranger', 'price' => 35000, 'image' => 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200', 'specs' => '2.3L Turbo, Pickup', 'year' => 2024, 'brand' => 'Ford'],
            ['name' => 'Tesla Model 3', 'price' => 42000, 'image' => 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200', 'specs' => 'Electric, AWD', 'year' => 2025, 'brand' => 'Tesla'],
            ['name' => 'Porsche 911 Carrera', 'price' => 115000, 'image' => 'https://images.unsplash.com/photo-1511919884226-7b3b5c3e5b4a?w=1200', 'specs' => 'Rear-engine, Sports Coupe', 'year' => 2024, 'brand' => 'Porsche'],
            ['name' => 'Mercedes-Benz S-Class', 'price' => 110000, 'image' => 'https://images.unsplash.com/photo-1601758003122-99b6a6b1b5c8?w=1200', 'specs' => 'V8, Luxury Sedan', 'year' => 2024, 'brand' => 'Mercedes-Benz'],
            ['name' => 'Kia Carnival', 'price' => 35000, 'image' => 'https://images.unsplash.com/photo-1605902711622-cfb43c44367f?w=1200', 'specs' => '3.5L V6, Minivan', 'year' => 2024, 'brand' => 'Kia'],
            ['name' => 'Subaru Outback', 'price' => 33000, 'image' => 'https://images.unsplash.com/photo-1542362567-1c0d9e2f3d58?w=1200', 'specs' => '2.5L Boxer, Crossover', 'year' => 2024, 'brand' => 'Subaru'],
            ['name' => 'Lamborghini Huracán Evo', 'price' => 300000, 'image' => 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200', 'specs' => 'V10, Supercar', 'year' => 2025, 'brand' => 'Lamborghini'],
        ];

        foreach ($cars as $car) {
            \App\Models\Car::create($car);
        }
    }
}
