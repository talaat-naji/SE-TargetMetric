<?php

namespace App\Http\Controllers;

use App\Models\Price;
use App\Models\Product;
use App\Models\Sale;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function getProductsByUser()
    {
        //  $products= Supplier::where('user_id',Auth::id())->with('products')->with("stock")->get();
        //  return $products;
     $products= Product::join('suppliers', function ($join) {
            $join->on('suppliers.id', '=', 'products.supplier_id');
            $join->where("suppliers.user_id", '=', Auth::id());
        })->join("stocks", 'products.id', "stocks.product_id")
          
            ->select('suppliers.id', "products.*", "stocks.qty")
            ->get();
           
            
             $sold=
            //   Product::join('suppliers', function ($join) {
            //     $join->on('suppliers.id', '=', 'products.supplier_id');
            //     $join->where("suppliers.user_id", '=', Auth::id());
            // })->join("sales", 'products.id', "sales.product_id")
              Sale::where("user_id",Auth::id())
                ->select("product_id as prodId", DB::raw("SUM(qty_sold) as totSoldQty"))
                ->groupby("prodId")
                ->get();
           
            
           
             $result=[$products,$sold];
            return $result;
    }

    public function editProduct(Request $request)
    {
        Product::where('id', $request->productId)
            ->update([
                'price' => $request->price,
                'cost' => $request->cost,
                'description' => $request->productDesc
            ]);
    }

    public function editProductPic(Request $request)
    {

        if ($request->hasFile('image')) {
            $file      = $request->file('image');
            $filename  = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $picture   = date('His') . '-' . $filename;
            //move image to public/img folder
            $file->move(public_path('img'), $picture);
           

            Product::where("id", $request->prod_id)->update(["pic_path" => '/' . 'img' . '/' . $picture]);
        }
    }
}
