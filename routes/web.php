<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard/rent-apartment', function () {
    return Inertia::render('RentApartmentPage');
})->middleware(['auth', 'verified'])->name('rentApartment');

Route::get('/dashboard/manage-apartments', function () {
    return Inertia::render('ManageApartments');
})->middleware(['auth', 'verified'])->name('manageApartments');

Route::get('/dashboard/liked', function () {
    return Inertia::render('LikedPage');
})->middleware(['auth', 'verified'])->name('liked');

Route::get('/dashboard/booked', function () {
    return Inertia::render('BooksPage');
})->middleware(['auth', 'verified'])->name('booked');

Route::get('/apartment/{id}', function ($id) {
    return Inertia::render('ApartmentPage', ['id' => $id]);
})->name('apartment');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/api.php';
