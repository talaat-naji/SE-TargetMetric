<?php

namespace App\Http\Controllers;

use App\Events\shopOrderedRetailer;
use App\Models\Sale;
use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use App\Models\Location;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ShopController extends Controller
{
    public function getCustomersCount()
    {
        $dateS = Carbon::now()->startOfMonth()->subMonth(11);
        $dateE = Carbon::now();
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
                "u.profile_url",
                "u.id",
                "loc.id",
                "loc.district_id",
                "loc.governorate_id",
                "gov.gov_name as govName",
                "dis.district_name as distName",
                DB::raw("(select SUM(test.subTotal) 
                from (select sum(s2.qty_sold*p.price) as subTotal 
                        from sales as s2
                           left Join products as p on s2.product_id = p.id
                           where s2.user_id =".Auth::id()." and s2.shop_id =s.shop_id 
                           group By s2.product_id
                      )as test
              )as total"),
            )
             
            ->orderBy(DB::raw('total', 'asc'))
            ->get();

  

        return $result;
    }

    public function getRetailers(){

     return   User::where("userType","=","retailer")->with('governorate')->with("district")->get();
    }

    public function getRetailersProducts(){

      return  Product::join('suppliers', function ($join) {
        $join->on('suppliers.id', '=', 'products.supplier_id');
        $join->where("suppliers.user_id", '=', request("retailer_id"));
    })->select('suppliers.id',"products.*")->paginate(6);

    }

    public function orderProduct(Request $request){
        event(new shopOrderedRetailer($request->retailer_id));
        $order=new Order();

        $order->shop_id=Auth::id();
        $order->user_id=$request->retailer_id;
        $order->product_id=$request->product_id;
        $order->qty_ordered=$request->qty;
        $order->status=false;
        $order->lat=$request->lat;
        $order->lng=$request->lng;
        $order->save();

        
    }

    public function getProductsByBarcode(Request $request){

      return  Product::where('barcode',$request->barcode)->with('retailer')->get();
    }

    public function getDemandedProductsInDistrict(){

        $dateS = Carbon::now()->startOfMonth()->subMonth(12);
        $dateE = Carbon::now()->startOfMonth();

        return Sale::select(DB::raw("SUM(sales.qty_sold) as qtySold"),"products.barcode")
        
        ->leftJoin("products","products.id","sales.product_id")
        ->Join("locations",function ($join) {
            $join->on('locations.user_id', '=', 'sales.shop_id');
            $join->where("locations.district_id", '=', DB::raw("locations.district_id where locations.user_id =".Auth::id()));
            $join->whereBetween("sales.created_at",[Carbon::now()->startOfMonth()->subMonth(12),Carbon::now()]);})
        
        ->groupBy("products.barcode")
        ->orderBy("qtySold","desc")
        ->get();
    }

   
}
