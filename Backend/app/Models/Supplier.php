<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Supplier extends Model
{
    use HasFactory;

    public function products(){
        return $this->hasMany(Product::class);
    }
    public function stock(){
        return $this->hasOneThrough(Stock::class,Product::class);
    }
    
}
