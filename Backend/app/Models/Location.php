<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    public function governorate(){
        return $this->hasOne(Governorate::class);
    }
    
    public function district(){
        return $this->hasOne(District::class);
    }
}
