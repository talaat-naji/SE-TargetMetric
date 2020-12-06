<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class SaleController extends Controller
{
    public function getSales(){
       $result= DB::table("sales as s")
        ->select(DB::raw('sum(s.qty_sold*p.price) as sales'),'s.product_id as pId',DB::raw('MONTH(s.created_at) as month'))
        ->leftJoin("prices as p","s.product_id","=","p.product_id")
        ->where('s.user_id',Auth::id())
        ->where('p.user_id',Auth::id())
        ->whereBetween('s.created_at',[Carbon::now()->startOfYear(),Carbon::now()->endOfYear()])
        ->groupBy('s.product_id')
        ->groupBy(DB::raw('MONTH(s.created_at)'))
        ->orderBy('month','asc')
        ->get();

        return $result;
    }

    public function getProfit(){
        $result1= DB::table("sales as s")
         ->select(DB::raw('sum(s.qty_sold*(p.price-p.cost)) as sales'),'s.product_id as pId',DB::raw('MONTH(s.created_at) as month'))
         ->leftJoin("prices as p","s.product_id","=","p.product_id")
         ->where('s.user_id',Auth::id())
         ->where('p.user_id',Auth::id())
         ->whereBetween('s.created_at',[Carbon::now()->startOfYear(),Carbon::now()->endOfYear()])
         ->groupBy('s.product_id')
         ->groupBy(DB::raw('MONTH(s.created_at)'))
         ->get();
 
         return $result1;
     }

     public function getYearlyProfit(){
        $dateS=Carbon::now()->startOfYear()->subYear(10);
        $result1= DB::table("sales as s")
         ->select(DB::raw('sum(s.qty_sold*(p.price-p.cost)) as profits'),'s.product_id as pId',DB::raw('YEAR(s.created_at) as year'))
         ->leftJoin("prices as p","s.product_id","=","p.product_id")
         ->where('s.user_id',Auth::id())
         ->where('p.user_id',Auth::id())
         ->whereBetween('s.created_at',[$dateS,Carbon::now()])
         ->groupBy('s.product_id')
         ->groupBy(DB::raw('YEAR(s.created_at)'))
         ->orderBy(DB::raw('YEAR(s.created_at)'),'asc')
         ->get();
 
         return $result1;
     }

     public function getCustomerSales(Request $request){
        $result= DB::select(
                DB::raw("select SUM(test.subTotal) as total ,test.month as month
                             FROM (select SUM(s2.qty_sold*p.price) as subTotal ,MONTH(s2.created_at) as month
                                     FROM sales as s2
                                      left Join prices as p on s2.product_id = p.product_id
                                     where s2.user_id =".Auth::id()." and p.user_id =".Auth::id()." and s2.shop_id =".$request->id." and
                                     s2.created_at BETWEEN '".Carbon::now()->startOfYear()."' and '".Carbon::now()->endOfYear()."'
                                    group By s2.product_id,MONTH(s2.created_at)
                                )as test
                        group By month
                        order by month"));
        
 
         return $result;
     }
}
