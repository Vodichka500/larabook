<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Like;
class LikesController extends Controller
{
    public function deleteUserLike($user_id, $apartment_id)
    {
        $like = Like::where('user_id', $user_id)
            ->where('apartment_id', $apartment_id)
            ->first();

        if (!$like) {
            return response()->json([
                'message' => 'Like not found.'
            ]);
        }

        $like->delete();

        return response()->json([
            'message' => 'Like deleted successfully.'
        ]);
    }

    public function createUserLike($user_id, $apartment_id)
    {
        $existingLike = Like::where('user_id', $user_id)
            ->where('apartment_id', $apartment_id)
            ->first();

        if ($existingLike) {
            return response()->json([
                'message' => 'Like already exists.'
            ]);
        }

        $like = Like::create([
            'user_id' => $user_id,
            'apartment_id' => $apartment_id,
        ]);

        return response()->json([
            'message' => 'Like added successfully.',
            'like' => $like
        ]);
    }
}
