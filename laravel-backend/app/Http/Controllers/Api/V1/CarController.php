<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::paginate(20);
        return response()->json($cars);
    }

    public function show($id)
    {
        $car = Car::find($id);
        
        if (!$car) {
            return response()->json(['message' => 'Car not found'], 404);
        }
        
        return response()->json($car);
    }

    public function search(Request $request)
    {
        $query = Car::query();
        
        if ($request->has('q')) {
            $searchTerm = $request->input('q');
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('brand', 'like', "%{$searchTerm}%")
                  ->orWhere('year', 'like', "%{$searchTerm}%");
            });
        }
        
        if ($request->has('brand')) {
            $query->where('brand', $request->input('brand'));
        }
        
        if ($request->has('year')) {
            $query->where('year', $request->input('year'));
        }
        
        $cars = $query->paginate(20);
        return response()->json($cars);
    }
}