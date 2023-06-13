<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subadmin extends Model
{
    protected $fillable = ['user_id', 'name', 'password', 'type', 'status', 'created_by'];
}
