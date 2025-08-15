<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('apartments', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->string('country');
            $table->double('rating', 1, 1)->default(4.2);
            $table->text('place_description')->nullable();
            $table->text('important_information')->nullable();
            $table->string('apartment_type');
            $table->integer('max_guests');
            $table->integer('bedrooms_quantity');
            $table->integer('bathrooms_quantity')->default(1);
            $table->integer('beds_quantity');
            $table->decimal('price', 8, 2);
            $table->text('rules');
            $table->json('booked_dates')->nullable();
            $table->json('images')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apartments');
    }
};
