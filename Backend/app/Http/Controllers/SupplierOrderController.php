<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Mail\OrderProducts;
use App\Models\OrderContent;
use Illuminate\Http\Request;
use App\Models\supplierOrder;
use Illuminate\Support\Facades\Mail;
use App\Notifications\SupplierOrders;
use Illuminate\Support\Facades\Notification;

class SupplierOrderController extends Controller
{
    public function issueOrder(Request $request)
    {


        $lastId = supplierOrder::create([
            "supplier_id" => $request->supplier_id,
            "status" => false,
             ])->id;


        foreach ($request->orderList as $order) {
            
            
                OrderContent::create([
                    "supplier_order_id" => $lastId,
                    "product_id" => $order['pId'],
                    "qty" => $order['qty']
                ]);
            
        }

        $this->orderSupplier($request,$lastId);

    }

    public function orderSupplier(Request $request,$order_Id){
   
    Mail::to($request->supplier_email)->send(new OrderProducts($request,$order_Id));
    
    }
}
