<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    public function shop(){
        return $this->belongsTo(Shop::class);
    }

    public function retailer(){
        return $this->belongsTo(User::class);
    }

    public function product(){
        return $this->belongsTo(Product::class);
    }

    public function location(){
        return $this->hasOneThrough(Location::class,User::class);
    }
}
