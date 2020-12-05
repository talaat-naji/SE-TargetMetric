<?php

namespace App\Http\Controllers;

use App\Models\District;
use Illuminate\Http\Request;

class DistrictController extends Controller
{
    public function getDistrict(Request $request){
        $results=District::select("id as value","district_name as label")
        ->where('governorate_id',$request->GovernorateId)
        ->get();
        return $results;
    }
}
