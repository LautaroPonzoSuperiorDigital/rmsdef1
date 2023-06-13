<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ListingController;
use App\Http\Controllers\Api\RentController;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::namespace('App\Http\Controllers\Api')->group(function () {
    Route::get('show-listings', 'ListingController@showListings');
    Route::get('public-listings', 'ListingController@publicListings');
    Route::get('show-listing/{id}', 'ListingController@showListing');
    Route::get('show-deleted-listings', 'ListingController@showDeletedListings');
    Route::post('add-listing', 'ListingController@addListing');
    Route::post('update-listing/{id}', 'ListingController@updateListing');
    Route::post('delete-listing/{id}', 'ListingController@deleteListing');
    Route::post('recover-listing/{id}', 'ListingController@recoverListing');
    Route::post('toggle-public/{id}', 'ListingController@togglePublic');
    Route::get('show-tenants', 'UserController@showTenants');
    Route::get('show-tenant/{id}', 'UserController@showTenant');
    Route::post('add-tenant', 'UserController@addTenant');
    Route::get('show-available-listings', 'ListingController@showAvailableListings');
    Route::get('show-applicants', 'ApplicationController@showApplicants');
    Route::get('show-subadmins', 'UserController@showSubadmins');
    Route::post('add-subadmin', 'UserController@addSubadmin');
    Route::put('update-subadmin/{id}', 'UserController@updateSubadmin');
    Route::delete('delete-subadmin/{id}', 'UserController@deleteSubadmin');
    Route::post('activate-subadmin/{id}', 'UserController@activateSubadmin');
    Route::post('deactivate-subadmin/{id}', 'UserController@deactivateSubadmin');
    Route::get('listing-details/{listingId}', 'ListingController@getListingDetails');
    Route::get('rent-details/{tenantId}', 'RentController@getRentDetails');
});
