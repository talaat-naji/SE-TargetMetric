<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Order;
use App\Models\Stock;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
  public function getOrders()
  {
    return  Order::where("status", "0")
      ->where('user_id', Auth::id())
      ->with('product')
      ->with('stock')
      ->with('shop')
      ->latest()->get();
  }

  public function deliverOrder(Request $request)
  {

    $stockQty = Stock::where("user_id", Auth::id())
      ->where("product_id", $request->product_id)->get();


    Order::where("id", $request->oId)->update(['status' => true]);

    if ($request->qty < $request->qty_ordered) {
      Order::insert([
        'product_id' => $request->product_id,
        'user_id' => Auth::id(),
        'shop_id' => $request->shop_id,
        'qty_ordered' => $request->qty_ordered - $request->qty,
        'status' => false,
        'created_at' => Carbon::now()
      ]);
    }

    Sale::insert([
      'product_id' => $request->product_id,
      // 'order_id'=>$request->oId,
      'shop_id' => $request->shop_id,
      'user_id' => Auth::id(),
      'qty_sold' => $request->qty,
      'created_at' => Carbon::now()
    ]);
    Stock::where("user_id", Auth::id())
      ->where("product_id", $request->product_id)
      ->update(['qty' => $stockQty[0]['qty'] - $request->qty]);
  }
}
