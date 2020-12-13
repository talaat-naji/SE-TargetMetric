<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'barcode', 'name', 'description', 'supplier_id',
        'cost',
        'price',
        'pic_path'
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function retailer()
    {
        return $this->belongsTo(User::class);
    }

    public function shopPrice()
    {
        return $this->hasOneThrough(Price::class, Shop::class);
    }

    public function retailerPrice()
    {
        return $this->hasOneThrough(Price::class, User::class);
    }

    public function stock()
    {
        return $this->hasOne(Stock::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
}
