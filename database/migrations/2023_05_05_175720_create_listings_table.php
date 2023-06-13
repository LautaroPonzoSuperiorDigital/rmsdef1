<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->string('location');
            $table->integer('lot_size');
            $table->integer('house_size');
            $table->decimal('price', 10, 2);
            $table->integer('public'); //1 public, 0 private
            $table->integer('bedrooms');
            $table->integer('bathrooms');
            $table->text('amentities')->nullable();
            $table->integer('status');//0 Inactive 1 Active 2 Deleted
            $table->bigInteger('created_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('listings');
    }
}
