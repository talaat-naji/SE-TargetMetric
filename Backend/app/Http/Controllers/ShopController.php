<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ShopController extends Controller
{
    public function getCustomersCount(){
        $dateS=Carbon::now()->startOfMonth()->subMonth(12);
        $dateE=Carbon::now()->startOfMonth();
        $result= DB::table("sales as s")
        
         ->select(DB::raw('count(DISTINCT shop_id) as customerCount'),DB::raw('MONTH(s.created_at) as month'))
         ->where('s.user_id',Auth::id())
         ->whereBetween('s.created_at',[$dateS,$dateE])
         ->groupBy(DB::raw('MONTH(s.created_at)'),DB::raw('s.created_at','asc'))
         ->orderBy(DB::raw('s.created_at','asc'))
          ->get();
 
         return $result;
     }
}
