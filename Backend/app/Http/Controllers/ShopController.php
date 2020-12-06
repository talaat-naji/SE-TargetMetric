<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ShopController extends Controller
{
    public function getCustomersCount()
    {
        $dateS = Carbon::now()->startOfMonth()->subMonth(12);
        $dateE = Carbon::now()->startOfMonth();
        $result = DB::table("sales as s")

            ->select(DB::raw('count(DISTINCT shop_id) as customerCount'), DB::raw('MONTH(s.created_at) as month'))
            ->where('s.user_id', Auth::id())
            ->whereBetween('s.created_at', [$dateS, $dateE])
            ->groupBy(DB::raw('MONTH(s.created_at)'), DB::raw('s.created_at', 'asc'))
            ->orderBy(DB::raw('s.created_at', 'asc'))
            ->get();

        return $result;
    }

    public function getCustomersTable()
    {

        $result = DB::table("sales as s")
        
            ->leftJoin("users as u", "u.id", "=", "s.shop_id")
            ->leftJoin("locations as loc", "loc.user_id", "=", "s.shop_id")
            ->leftJoin("governorates as gov", "gov.id", "=", "loc.governorate_id")
            ->leftJoin("districts as dis", "dis.id", "=", "loc.district_id")
            ->where('s.user_id', Auth::id())
            ->select(
                DB::raw(" DISTINCT s.shop_id"),
                "u.name",
                "u.id",
                "loc.id",
                "loc.district_id",
                "loc.governorate_id",
                "gov.gov_name as govName",
                "dis.district_name as distName",
                DB::raw("(select SUM(test.subTotal) 
                from (select sum(s2.qty_sold*p.price) as subTotal 
                        from sales as s2
                           left Join prices as p on s2.product_id = p.product_id
                           where s2.user_id =".Auth::id()." and s2.shop_id =s.shop_id 
                           group By s2.product_id
                      )as test
              )as total"),
            )
             
            ->orderBy(DB::raw('total', 'asc'))
            ->get();

  

        return $result;
    }
}
