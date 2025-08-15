<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apartment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'country',
        'rating',
        'place_description',
        'important_information',
        'apartment_type',
        'max_guests',
        'bedrooms_quantity',
        'beds_quantity',
        'price',
        'rules',
        'booked_dates',
        'images',
    ];

    // Связь с владельцем (пользователем)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Связь с бронированиями (много бронирований на одну квартиру)
    public function books()
    {
        return $this->hasMany(Book::class, 'apartment_id');
    }

    // Связь с любимыми квартирами (через промежуточную таблицу)
    public function likedByUsers()
    {
        return $this->belongsToMany(User::class, 'apartment_user_likes', 'apartment_id', 'user_id');
    }
}
