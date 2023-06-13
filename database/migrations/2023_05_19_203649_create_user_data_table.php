<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserDataTable extends Migration
{
    public function up()
    {
        Schema::create('user_data', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('name');
            $table->string('dl_number')->nullable();
            $table->string('dl_state')->nullable();
            $table->date('dob');
            $table->string('ssn')->nullable();
            $table->string('phone');
            $table->integer('background_check')->default(0);
            $table->integer('type')->default(0);//0 client 1 applicant 2 tenant
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

        });
    }

    public function down()
    {
        Schema::dropIfExists('tenants');
    }
}
