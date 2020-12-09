<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class SupplierController extends Controller
{

    public function getSuppliers()
    {
        return Supplier::where('user_id', Auth::id())->get();
    }

    public function addSupplier(Request $request)
    {
         Supplier::insert([
            "user_id" => Auth::id(),
            "name" => $request->name,
            "email" => $request->email,
            "phone" => $request->phone,
            "created_at" => Carbon::now()
        ]);
    }

    public function getSupplierProducts(Request $request)
    {
        return Supplier::where('user_id', Auth::id())
            ->where("id", $request->id)
            ->with("products")->get();
    }

    public function addSupplierProduct(Request $request)
    {
        Product::insert([
            "barcode"=>$request->product_id,
            "name" => $request->name,
            "description" => $request->desc,
            "supplier_id" => $request->supplier_id,
            "cost" => $request->cost,
            "price" => $request->price,
            "pic_path"=>"/image/test",
            "created_at" => Carbon::now()
        ]);
    }
}
