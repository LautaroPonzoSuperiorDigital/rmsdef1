<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'tenant_id',
        'listing_id',
        'rent_id',
        'amount',
        'payment_date',
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

    // Relación con el modelo Rent
    public function rent()
    {
        return $this->belongsTo(Rent::class);
    }
}
