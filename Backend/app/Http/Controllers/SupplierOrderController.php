<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\OrderContent;
use Illuminate\Http\Request;
use App\Models\supplierOrder;
use App\Notifications\SupplierOrders;
use Illuminate\Support\Facades\Notification;

class SupplierOrderController extends Controller
{
    public function issueOrder(Request $request)
    {


        $lastId = supplierOrder::create([
            "supplier_id" => $request->supplier_id,
            "status" => false,
            //"created_at"=>Carbon::now(),

        ])->id;





        foreach ($request->orderList as $order) {
            
            // foreach ($order as $value) {
               // var_dump($order);
                OrderContent::create([
                    "supplier_order_id" => $lastId,
                    "product_id" => $order['pId'],
                    "qty" => $order['qty']
                ]);
            // }
        }

        $this->orderSupplier($request,$lastId);

    }

    public function orderSupplier(Request $request,$order_Id){
        Notification::route('mail', $request->supplier_email)
       
        ->notify(new SupplierOrders($request,$order_Id));
      }
}
