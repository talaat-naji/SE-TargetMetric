<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class LocationController extends Controller
{
    public function getProfile()
    {
        return  DB::table('users')->select("users.name","users.about", "users.email","users.profile_url", "loc.town_name as town", "loc.governorate_id as govId", "loc.district_id as districtId")
            ->leftjoin("locations as loc", "users.id", '=', 'loc.user_id')
            ->where('users.id', Auth::id())
            ->get();
    }
    public function updateRetailerProfile(Request $request)
    {
        User::where('id', Auth::id())
            ->update(['name' => $request->name,'email' => $request->email ,"about"=>$request->about]);
            
        if (Location::where('user_id', Auth::id())->count() === 0) {
            Location::insert(
                [
                    'user_id' => Auth::id(),
                    'governorate_id' => $request->GovernorateId,
                    "district_id" => $request->districtId,
                    "town_name" => $request->town
                ]
            );
        } else {
            Location::where('user_id', Auth::id())
                ->update([
                    'governorate_id' => $request->GovernorateId,
                    "district_id" => $request->districtId,
                    "town_name" => $request->town
                ]);
        }
    }

    public function editProfilePic(Request $request){
        if ($request->hasFile('image'))
        {
              $file      = $request->file('image');
              $filename  = $file->getClientOriginalName();
              $extension = $file->getClientOriginalExtension();
              $picture   = date('His').'-'.$filename;
              //move image to public/img folder
            $file->move(public_path('profile'), $picture);
            

              User::where("id",Auth::id())->update(["profile_url"=>'/'.'profile'.'/' . $picture]);
    }}
}
