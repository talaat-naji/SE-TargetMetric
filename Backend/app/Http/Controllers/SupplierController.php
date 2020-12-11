<?php

namespace App\Http\Controllers;

use App\Models\Stock;
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
            ->with("products")->with('stock')->get();
    }

    public function addSupplierProduct(Request $request)
    {
        $pid = Product::create([
            "barcode" => $request->product_id,
            "name" => $request->name,
            "description" => $request->desc,
            "supplier_id" => $request->supplier_id,
            "cost" => $request->cost,
            "price" => $request->price,
            "pic_path" => "/image/test",
            // "created_at" => Carbon::now()
        ])->id;

        Stock::create([
            "product_id" => $pid,
            "user_id" => Auth::id(),
            "qty" => 0,
            "min_qty" => $request->min_qty,
            "max_orderQty" => $request->max_orderQty
        ]);
    }

    public function EditSupplierProduct(Request $request)
    {
        Product::where("id", $request->product_id)->update([
            "name" => $request->name,
            "description" => $request->desc,
            "cost" => $request->cost,
            "price" => $request->price,
            "pic_path" => "/image/test",
        ]);
        Stock::where("id", $request->product_id)
            ->update([
                "min_qty" => $request->min_qty,
                "max_orderQty" => $request->max_orderQty
            ]);
    }

    public function autoGenerateOrder(Request $request)
    {

        return  Stock::where("user_id", Auth::id())
            ->join('products', function ($join) {
                $join->on('products.id', '=', 'stocks.product_id');
                $join->where("products.supplier_id", '=', request("id"));
            })
            ->whereRaw("qty < min_qty OR qty=min_qty")
            ->get();
    }
}
