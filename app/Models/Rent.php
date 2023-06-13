<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rent extends Model
{
    protected $fillable = [
        'tenant_id',
        'listing_id',
        'start_date',
        'end_date',
        'amount',
        'status',
    ];

    // Relación con el modelo Tenant
    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    // Relación con el modelo Listing
    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }
}
