<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    protected $fillable = [
        "product_id",
        "user_id",
        "qty",
        "min_qty",
         "max_orderQty"
    ];
    public function retailer()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class, "id");
    }
    // public function product(){
    //     return $this->hasOne(Product::class,"id");
    // }
}
