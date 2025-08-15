<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $table = 'apartment_user_likes';

    protected $fillable = [
        'user_id',
        'apartment_id',
    ];
}
