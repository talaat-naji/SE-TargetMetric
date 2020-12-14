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
    //  $products= Supplier::where('user_id',Auth::id())->with('products')->with("stock")->get();
    //  return $products;
   return Product::join('suppliers', function ($join) {
        $join->on('suppliers.id', '=', 'products.supplier_id');
        $join->where("suppliers.user_id", '=', Auth::id());
    })->join("stocks",'products.id',"stocks.product_id")->select('suppliers.id',"products.*","stocks.*")->get();
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
