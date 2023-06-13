<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function index()
    {
        $applicants = Application::with('user', 'listing')->get();

        return response()->json([
            'applicants' => $applicants
        ]);
    }

    public function showApplicants()
    {
        $applicants = Application::with(['user.userData', 'listing'])
            ->select('id', 'user_id', 'listing_id', 'status')
            ->get();

        $formattedApplicants = $applicants->map(function ($applicant) {
            return [
                'id' => $applicant->id,
                'name' => $applicant->user->userData->name,
                'listing_id' => $applicant->listing_id,
                'status' => $applicant->status,
                'email' => $applicant->user->email,
                'phone' => $applicant->user->userData->phone,
            ];
        });

        return response()->json([
            'applicants' => $formattedApplicants
        ]);
    }

    public function moveToTenants(Request $request)
    {
        $application = Application::find($request->input('application_id'));

        if ($application) {
            // Aquí puedes agregar la lógica para mover al solicitante a la tabla "tenants"
            // Por ejemplo, puedes crear un registro en la tabla "tenants" usando los datos del solicitante
            // y luego eliminar el registro correspondiente en la tabla "applications"
            // Ejemplo de código:
            /*
            Tenant::create([
                'user_id' => $application->user_id,
                'listing_id' => $application->listing_id,
                // Otros campos necesarios
            ]);

            $application->delete();
            */

            return response()->json([
                'message' => 'Applicant moved to tenants successfully.'
            ]);
        }

        return response()->json([
            'message' => 'Application not found.'
        ], 404);
    }

    public function delete(Request $request)
    {
        $application = Application::find($request->input('application_id'));

        if ($application) {
            $application->delete();

            return response()->json([
                'message' => 'Application deleted successfully.'
            ]);
        }

        return response()->json([
            'message' => 'Application not found.'
        ], 404);
    }
}
