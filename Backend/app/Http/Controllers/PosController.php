<?php

namespace App\Http\Controllers;

use App\Models\ShopSales;
use App\Models\ShopStock;
use App\Models\SaleDetails;
use App\Models\ShopProducts;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use phpDocumentor\Reflection\Types\Null_;

class PosController extends Controller
{
   public function getProductByBarcode(Request $request)
   {
      return ShopStock::where("user_id", Auth::id())->where("barcode", $request->barcode)->get();
   }

   public function saveInv(Request $request)
   {

      $id = ShopSales::create([
         "total" => $request->total,
         "totalCost" => $request->totalCost,
         "customer" => $request->customer,
         "amountRecieved" => $request->recieved,
         "user_id" => Auth::id()
      ])->id;
      foreach ($request->invoice as $inv) {
         SaleDetails::create(
            [
               "barcode" => $inv["barcode"],
               "qty" => $inv["qty"],
               "uPrice" => $inv["price"],
               "shop_sale_id" => $id
            ]
         );
         ShopStock::where("user_id", Auth::id())
            ->where("barcode", $inv["barcode"])
            ->update(["qty" => DB::raw("qty - " . $inv['qty'])]);
      }
   }
   public function addProd(Request $request)
   {

      if ($request->id === null) {
         ShopProducts::create([
            "user_id" => Auth::id(),
            "barcode" => $request->barcode,
            "cost" => $request->cost,
            "price" => $request->price
         ]);
      } else {
         ShopProducts::where("user_id", Auth::id())
            ->where("id", $request->id)
            ->update([
               "barcode" => $request->barcode,
               "cost" => $request->cost,
               "price" => $request->price
            ]);
      }
   }

   public function getFavProds()
   {

      return ShopProducts::where("user_id", Auth::id())->whereRaw("barcode regexp '^[a-z]+'")->get();
   }

   public function getTodaySales()
   {

      $totalSales = ShopSales::where("user_id", Auth::id())
         ->whereDate("created_at", Carbon::today())
         ->select(DB::raw("SUM(total) as totalSales"))->get();

      $totalCosts = ShopSales::where("user_id", Auth::id())
         ->whereDate("created_at", Carbon::today())
         ->select(DB::raw("SUM(totalCost) as totalCosts"))->get();

      $creditSales = ShopSales::where("user_id", Auth::id())
         ->whereDate("created_at", Carbon::today())
         ->whereRaw("total>amountRecieved")
         ->select(DB::raw("SUM(total-amountRecieved) as CreditSales"))->get();

      return [$creditSales, $totalSales, $totalCosts];
   }

   public static function addToStock(Request $request)
   {
      $count = ShopStock::where("user_id", Auth::id())->where("barcode", $request->barcode)->count();

      if ($count > 0) {

         $qty = ShopStock::where("user_id", Auth::id())->where("barcode", $request->barcode)->get();

         $currentPropotion = $qty[0]['qty'] / ($qty[0]['qty'] + $request->qty);

         $newPropotion = 1 - $currentPropotion;
         $newCost = ($currentPropotion * $qty[0]["cost"]) + ($newPropotion * $request->cost);

         ShopStock::where("user_id", Auth::id())
            ->where("barcode", $request->barcode)
            ->update([
               "cost" => $newCost,
               "price" => $request->price,
               "qty" => $request->qty + $qty[0]['qty']

            ]);
      } else {
         ShopStock::create([
            "user_id" => Auth::id(),
            "barcode" => $request->barcode,
            "description" => $request->description,
            "price" => $request->price,
            "cost" => $request->cost,
            "qty" => $request->qty

         ]);
      }
   }

   public function getSales()
   {
      $dateS = Carbon::now()->startOfYear();
      $dateE = Carbon::now()->endOfYear();

      $sales = ShopSales::where("user_id", Auth::id())
         ->whereBetween("created_at", [$dateS, $dateE])
         ->select(DB::raw("SUM(total) as totalSales , MONTH(created_at) as month "))
         ->groupBy("month")->get();

      $profit =  ShopSales::where("user_id", Auth::id())
      ->whereBetween("created_at", [$dateS, $dateE])
      ->select(DB::raw("SUM(total-totalCost) as totalProfit , MONTH(created_at) as month "))
      ->groupBy("month")->get();

      return [$sales, $profit];
   }
   public function getDailySales(Request $request)
   {
      $dateS = Carbon::now()->startOfYear();
      $dateE = Carbon::now()->endOfYear();

      $sales = ShopSales::where("user_id", Auth::id())
         ->whereBetween("created_at", [$dateS, $dateE])
         ->whereRaw("MONTH(created_at) = $request->month")
         ->select(DB::raw("SUM(total) as totalSales , DAY(created_at) as day "))
         ->groupBy("day")->get();

      $profit =  ShopSales::where("user_id", Auth::id())
      ->whereBetween("created_at", [$dateS, $dateE])
      ->whereRaw("MONTH(created_at) = $request->month")
      ->select(DB::raw("SUM(total-totalCost) as totalProfit , DAY(created_at) as day "))
      ->groupBy("day")->get();

      return [$request->month,$sales, $profit];
   }
   public function getGroupedDebts()
   {

      return ShopSales::where("user_id", Auth::id())
         ->whereRaw("amountRecieved<total")
         ->select(DB::raw("SUM(total-amountRecieved) as debtValue,customer"))
         ->groupBy("customer")
         ->get();
   }

   public function getCustomerDebts(Request $request)
   {

      return ShopSales::where("user_id", Auth::id())
         ->where("customer", $request->name)
         ->whereRaw("amountRecieved<total")->get();
   }

   public function savePayment(Request $request)
   {

      foreach ($request->data as $invoice) {

         ShopSales::where("user_id", Auth::id())
            ->where("id", $invoice["id"])
            ->update(["amountRecieved" => $invoice["amountRecieved"]]);
      }
   }
}
