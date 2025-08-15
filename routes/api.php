<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApartmentsController;
use App\Http\Controllers\Api\UsersController;
use \App\Http\Controllers\Api\LikesController;
use \App\Http\Controllers\Api\BooksController;

Route::get('api/apartments', [ApartmentsController::class, 'index']);
Route::post('/api/apartments', [ApartmentsController::class, 'store']);
Route::get('api/apartment/{id}', [ApartmentsController::class, 'show']);
Route::delete('api/apartment/{id}', [ApartmentsController::class, 'deleteApartment']);
Route::get('api/user/{id}/apartments', [ApartmentsController::class, 'getUsersApartments']);

Route::get('api/books', [BooksController::class, 'index']);
Route::get('api/apartment/{id}/books', [BooksController::class, 'apartmentBooks']);
Route::get('api/user/{id}/books', [BooksController::class, 'userBooks']);
Route::post('api/books', [BooksController::class, 'addBook']);
Route::delete('api/books/{id}', [BooksController::class, 'removeBook']);

Route::get('api/user/{id}', [UsersController::class, 'show']);
Route::get('api/user/{id}/likes', [UsersController::class, 'getUserLikes']);
Route::delete('api/user/{user_id}/likes/{apartment_id}', [LikesController::class, 'deleteUserLike']);
Route::post('api/user/{user_id}/likes/{apartment_id}', [LikesController::class, 'createUserLike']);
