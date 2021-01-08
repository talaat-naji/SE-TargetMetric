<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function shop(){
        return $this->belongsTo(User::class);
    }
    

    public function product(){
        return $this->hasOne(Product::class,"id","product_id");
    }
    public function stock(){
        return $this->hasOne(Stock::class,"product_id","product_id");
    }
}
