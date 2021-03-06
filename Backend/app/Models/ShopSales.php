<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopSales extends Model
{
    use HasFactory;

    protected $fillable=["total","totalCost","customer","user_id","amountRecieved"];
}
