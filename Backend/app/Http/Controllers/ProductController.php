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
    
    public function editProductPic(Request $request){

        if ($request->hasFile('image'))
        {
              $file      = $request->file('image');
              $filename  = $file->getClientOriginalName();
              $extension = $file->getClientOriginalExtension();
              $picture   = date('His').'-'.$filename;
              //move image to public/img folder
            $file->move(public_path('img'), $picture);
              //$file_namewithExt = $request->file('path')->getClientOriginalName();
            // $file->storeAs('/public', $picture);
            //   $media = new Media();
            //   $cid = $conspiracy->id;
            //   $media->conspiracy_id = $cid;
            //   $media->path = '/'.'img'.'/' . $picture;
            //   $media->save();

              Product::where("id",$request->prod_id)->update(["pic_path"=>'/'.'img'.'/' . $picture]);
        }
    }
}
