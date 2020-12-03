<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    public function retailer(){
        return $this->belongsTo(User::class);
    }

    public function products(){
        return $this->hasManyThrough(Product::class,User::class);
    }
}
