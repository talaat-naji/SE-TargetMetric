<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Models\Supplier;
use App\Mail\OrderRecieved;
use App\Models\OrderContent;
use App\Models\RecieveOrder;
use Illuminate\Http\Request;
use App\Models\supplierOrder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Notifications\SupplierOrders;

class RecieveOrderController extends Controller
{
  public function getContent(Request $request){
    $orderId= supplierOrder::where("status",false)
    ->where("supplier_id",$request->supplier_id)
    ->where("id",$request->order_id)
    ->count();

if($orderId===0)  {
  return  OrderContent::where("supplier_order_id",$request->order_id)->with('product')->with("recieved")->get();

}   
else{return  OrderContent::where("supplier_order_id",$request->order_id)->with('product')->get();}                  
}

   public function getSupplierById(Request $request){
     return Supplier::where("user_id",Auth::id())->where("id",$request->supplier_id)->get();
   }

   public function getOrderById(Request $request){
    $orderId= supplierOrder::where("status",false)
                            ->where("supplier_id",$request->supplier_id)
                            ->where("id",$request->order_id)
                            ->count();

     if($orderId===0)  {
       return ["id"=>null];

     }   
     else{return  OrderContent::where("supplier_order_id",$request->order_id)->with('product')->get();}                  
   }

   public function sendInvoice(Request $request){
    supplierOrder::where("supplier_id",$request->supplier_id)
    ->where("id",$request->order_id)
    ->update(["status"=>true]);

    foreach ($request->invoice as $order) {
     
         RecieveOrder::create([
              "supplier_order_id" => $request->order_id,
              "product_id" => $order['pId'],
              "qty" => $order['qtyRecieved']
          ]);

          Stock::where("user_id",Auth::id())
          ->where("product_id" , $order['pId'])
          ->update(["qty"=>DB::raw("qty + ".$order['qtyRecieved'])]);
    
  }

  Mail::to($request->supplier_email)->send(new OrderRecieved($request,$request->sum));

   }
}
