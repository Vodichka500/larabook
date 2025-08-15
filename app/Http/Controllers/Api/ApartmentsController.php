<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use Illuminate\Http\Request;

class ApartmentsController extends Controller
{
    public function index()
    {
        return response()->json(Apartment::all());
    }

    public function show($id)
    {
        return response()->json(Apartment::find($id));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|min:10',
            'description' => 'required|min:20|max:1000',
            'images.*' => 'image|max:4096', // Ограничение размера на 2 МБ
            "address" => 'required|max:255',
            "apartmentType" => 'required|max:255',
            "maxGuests" => 'required|integer|min:1|max:100',
            "bedrooms" => 'required|integer|min:1|max:20',
            "beds" =>  'required|integer|min:1|max:20',
            "bathrooms" => 'required|integer|min:1|max:20',
            "price" => 'required|numeric|min:1|max:1000000',
        ]);

        $images = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $filename = uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images'), $filename);
                $images[] = '/images/' . $filename;
            }
        }


        // Сохранение в БД
        $apartment = Apartment::create([
            'user_id' => auth()->user()->id,
            'title' => $request->title,
            'description' => $request->description,
            'images' => json_encode($images),
            "place_description" => $request->placeDescription,
            "important_information" => $request->importantInformation ,
            "country" => $request->country ,
            "address" => $request->address ,
            "apartment_type" => $request->apartmentType ,
            "max_guests" => $request->maxGuests,
            "bedrooms_quantity" => $request->bedrooms ,
            "beds_quantity" => $request->beds ,
            "bathrooms_quantity" => $request->bathrooms ,
            "price" => $request->price ,
            "rules" => $request->rules || "None" ,
        ]);

        return response()->json($apartment, 201);
    }

    public function deleteApartment($id)
    {
        $apartment = Apartment::find($id);
        if (!$apartment) {
            return response()->json([
                'message' => 'Apartment not found.'
            ]);
        }
        $apartment->delete();
        return response()->json([
            'message' => 'Apartment deleted successfully.', 200
        ]);
    }

    public function getUsersApartments($id)
    {
        $apartments = Apartment::where('user_id', $id)->get();
        return response()->json($apartments);
    }
}
