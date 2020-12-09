<?php

namespace App\Http\Controllers;

use App\Models\Price;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function getProductsByUser(){
     $products= Supplier::where('user_id',Auth::id())->with('products')->get();
     return $products;
    }

    public function editProduct(Request $request){
        Product::where('id', $request->productId)
        // ->where('supplier_id', $request->supplier_id)
        ->update([
            'price' => $request->price,
            'cost'=>$request->cost,
        'description' => $request->productDesc
        ]);

    }
}
