<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = [
        'name',
        'price',
        'image',
        'specs',
        'year',
        'brand',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'year' => 'integer',
    ];
}
