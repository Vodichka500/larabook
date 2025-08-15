<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone_number',
        'first_name',
        'last_name',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Связь с квартирами (пользователь может создать много квартир)
    public function apartments()
    {
        return $this->hasMany(Apartment::class, 'user_id');
    }

    // Связь с бронированиями (пользователь может забронировать много квартир)
    public function books()
    {
        return $this->hasMany(Book::class, 'customer_id');
    }

    // Связь с любимыми квартирами (через промежуточную таблицу, если нужно)
    public function likedApartments()
    {
        return $this->belongsToMany(Apartment::class, 'apartment_user_likes', 'user_id', 'apartment_id');
    }
}
