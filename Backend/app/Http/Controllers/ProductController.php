<?php

namespace App\Http\Controllers;

use App\Models\Price;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function getProductsByUser(){
     $products= Price::where('user_id',Auth::id())->with('product')->get();
     return $products;
    }
}
