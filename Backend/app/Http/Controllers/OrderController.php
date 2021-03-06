<?php

namespace App\Http\Controllers;

use App\Mail\OrderProducts;
use Carbon\Carbon;
use App\Models\Sale;
use App\Models\Order;
use App\Models\Stock;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Notifications\StockDeficiet;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;

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
  public function getOrdersShopside()
  {
    return  Order::where('shop_id', Auth::id())
    ->whereIn("status",["0","1"])
      ->with('product')
      ->with('user')
      ->latest()->get();
  }
  public function getOrdersShopsidePage()
  {
    return  Order::where('shop_id', Auth::id())
      ->with('product')
      ->with('user')
      ->latest()->get();
  }

  public function recieveOrder(Request $request){
   Order::where("id", $request->oId)->update(['status' => "recieved"]);
    PosController::addToStock($request);
  }

  public function deliverOrder(Request $request)
  {

    $stockQty = Stock::where("user_id", Auth::id())
      ->where("product_id", $request->product_id)->get();

    

    if ($request->qty < $request->qty_ordered) {
      Order::where("id", $request->oId)->update(['qty_ordered' => $request->qty_ordered - $request->qty]);
    }elseif ($request->qty === $request->qty_ordered) {
      Order::where("id", $request->oId)->update(['status' => "1"]);
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
      ->update(['qty' => DB::raw("qty - ".$request->qty)]);

      if($stockQty[0]['qty']-$request->qty<=$stockQty[0]['min_qty']){
        $data['message']="deficiet";
        return $data['message'];
      }

     
  }

  // public function orderSupplier(Request $request){
  //   // Notification::route('mail', $request->supplier_email)
   
  //   // ->notify(new StockDeficiet($request));
  //   Mail::to($request->supplier_email)->send(new OrderProducts($request));
  // }
}
