<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public function shop(){
        return $this->belongsTo(Shop::class);
    }

    public function retailer(){
        return $this->belongsTo(User::class);
    }

    public function shopPrice(){
        return $this->hasOneThrough(Price::class,Shop::class);
    }

    public function retailerPrice(){
        return $this->hasOneThrough(Price::class,User::class);
    }
}
