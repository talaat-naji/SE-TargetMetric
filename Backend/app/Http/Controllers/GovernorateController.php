<?php

namespace App\Http\Controllers;

use App\Models\Governorate;
use Illuminate\Http\Request;

class GovernorateController extends Controller
{

    public function getGovernorate(){
    $results=Governorate::selectRaw("id as value ,gov_name as label")->get();
    return $results;
}
}
