<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rent;

class RentController extends Controller
{
    public function getRentDetails($tenantId)
    {
        $rent = Rent::where('tenant_id', $tenantId)->first();
        
        if (!$rent) {
            return response()->json(['message' => 'No se encontró el contrato de alquiler'], 404);
        }
        
        // Aquí puedes realizar cualquier otra lógica o modificaciones necesarias antes de devolver la respuesta
        
        return response()->json(['rent' => $rent]);
    }
}
