<?php

namespace App\Http\Controllers;

use App\Models\ShopStock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PosController extends Controller
{
   public function getProductByBarcode(Request $request){
      return ShopStock::where("user_id",Auth::id())->where("barcode",$request->barcode)->get();
   }

   public function saveInv(Request $request){

      
   }
}
