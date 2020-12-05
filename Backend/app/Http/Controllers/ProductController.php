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

    public function editProduct(Request $request){
        Price::where('product_id', $request->productId)
        ->where('user_id', Auth::id())
        ->update(['price' => $request->price]);

        Product::where('id', $request->productId)
        ->update(['description' => $request->productDesc]);

    }
}
