<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserData extends Model
{
    // use HasFactory;
    protected $fillable = [
        'user_id',
        'name',
        'dl_number',
        'dl_state',
        'dob',
        'ssn',
        'phone',
        'background_check',
        'type',
        'created_by',
    ];
}
