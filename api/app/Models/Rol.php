<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;

    protected $timestamps = false;

    public function users(){
        return $this->hasMany(User::class);
    }
    public function patients(){
        return $this->hasMany(Patient::class);
    }
}
