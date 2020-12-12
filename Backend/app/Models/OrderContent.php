<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderContent extends Model
{
    use HasFactory;

    protected $fillable=["supplier_order_id","product_id","qty"];

    public function product(){
        return $this->belongsTo(Product::class);
    }
}
