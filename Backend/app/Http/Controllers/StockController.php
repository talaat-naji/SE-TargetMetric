<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class StockController extends Controller
{
    public function getStockValue(){
        $data= DB::table("stocks as s")
         ->select(DB::raw('sum(s.qty*p.price) as Salevalue'),DB::raw('sum(s.qty*p.cost) as costvalue'),'s.product_id as pId')
         ->leftJoin("products as p","s.product_id","=","p.id")
         ->where('s.user_id',Auth::id())
         ->groupBy('s.product_id')       
         ->get();

        $saleValue=0;
        $costValue=0;
        $result = json_decode($data, true);
        foreach ($result as $item) {
           $saleValue+=$item["Salevalue"];
           $costValue+=$item["costvalue"];

        }
 $finalResult=["saleValue"=>$saleValue,"costValue"=>$costValue];

         return $finalResult;
     }

     public function getStock(){
         $data=Stock::where('user_id',Auth::id())->with('products')->get();
         return $data;
     }
}
