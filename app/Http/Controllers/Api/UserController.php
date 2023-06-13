<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\UserData;
use App\Models\Listing;
use App\Models\Rent;
use App\Models\Payment;
use App\Models\Subadmin;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return UserResource::collection(User::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);

        return response(new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\User                     $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response("", 204);
    }

    public function showTenants()
    {
        $tenants = User::join('user_data', 'users.id', '=', 'user_data.user_id')
            ->leftJoin('rents', 'users.id', '=', 'rents.user_id')
            ->leftJoin('payments', 'rents.id', '=', 'payments.rent_id')
            ->selectRaw('users.id as user_id, user_data.name as tenant_name, rents.listing_id as listing_id, payments.status as payment_status, users.email as email, user_data.phone as phone, rents.start_date as start_date, rents.end_date as end_date, user_data.background_check as background_check')
            ->where('user_data.type', '=', 2)
            ->get();

        return response()->json(['tenants' => $tenants], 200);
    }

    public function showAllTenants()
    {
        $tenants = User::join('user_data', 'users.id', '=', 'user_data.user_id')
            ->join('rents', 'users.id', '=', 'rents.user_id')
            ->where('user_data.type', '=', 2)
            ->get();
        return response()->json(['tenants' => $tenants], 200);
    }

    public function showSubadmins()
    {
        $users = User::join('subadmins', 'users.id', '=', 'subadmins.user_id')
            ->where('users.role', 0)
            ->orWhere('users.role', 1)
            ->select('users.*', 'subadmins.*', 'subadmins.password as decryptpassword')
            ->get();
        return response()->json(['users' => $users], 200);
    }

    public function addSubadmin(Request $request)
    {
        $email = $request->input('email');
        $user2 = User::where('email', $email)->first();

        if (!$user2) {
            $user = new User();
            $user->email = $email;
            $user->password = bcrypt($request->input('decryptpassword'));
            $user->role = $request->input('role');
            $user->status = 0;
            $user->save();

            $user->subadmin()->create([
                'name' => $request->input('name'),
                'password' => $request->input('decryptpassword'),
                'type' => 1,
                'created_by' => 1
            ]);

            return response()->json(['message' => 'User added successfully'], 200);
        } else {
            return response()->json(['message' => 'Email already registered.'], 422);
        }
    }

    public function updateSubadmin(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $email = $request->input('email');

        if ($user->email != $email) {
            $user2 = User::where('email', $email)->first();
            if (!$user2) {
                $user->email = $email;
            } else {
                return response()->json(['message' => 'Email already registered.'], 422);
            }
        }

        $user->password = bcrypt($request->input('password'));
        $user->role = $request->input('role');
        $user->save();

        $user->subadmin()->update([
            'name' => $request->input('name'),
            'password' => $request->input('decryptpassword'),
            'type' => 1
        ]);

        return response()->json(['message' => 'Usuario actualizado exitosamente'], 200);
    }

    public function deleteSubadmin($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        $user->subadmin()->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    public function activateSubadmin($id)
    {
        $subadmin = Subadmin::findOrFail($id);
        $user = User::findOrFail($subadmin->user_id);

        $user->status = 1;
        $user->save();

        return response()->json([
            'message' => 'User activated successfully',
            'user' => $user,
        ]);
    }

    public function deactivateSubadmin($id)
    {
        $subadmin = Subadmin::findOrFail($id);
        $user = User::findOrFail($subadmin->user_id);

        $user->status = 0;
        $user->save();

        return response()->json([
            'message' => 'User deactivated successfully',
            'user' => $user,
        ]);
    }

    public function showTenant($id)
    {
        $tenant = User::find($id);

        if (!$tenant) {
            return response()->json(['error' => 'Tenant not found'], 404);
        }

        $info = UserData::find($tenant->user_id);
        $listing = Listing::find($tenant->listing_id);
        $rent = Rent::where('tenant_id', $id)->first();

        return response()->json([
            'tenant' => $tenant,
            'info' => $info,
            'listing' => $listing,
            'rent' => $rent
        ]);
    }

    // public function addTenant(Request $request)
    // {
    //     $tenant = new User();
    //     $tenant->name = $request->input('name');
    //     $tenant->driver_license = $request->input('driver_license');
    //     $tenant->dob = $request->input('dob');
    //     $tenant->ssn = $request->input('ssn');
    //     $tenant->email = $request->input('email');
    //     $tenant->phone = $request->input('phone');
    //     $tenant->background_check = $request->input('background_check') ? 1 : 0;
    //     $tenant->save();

    //     return response()->json(['tenant' => $tenant]);
    // }
}
