<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;

class BooksController extends Controller
{
    public function index()
    {
        return response()->json(Book::all());
    }

    public function apartmentBooks($id)
    {
        $books = Book::where('apartment_id', $id)->get();

        if($books->isEmpty()) {
            return response()->json(['message' => 'No books found for this apartment'], 404);
        }

        return response()->json($books, 200);
    }

    public function userBooks($id)
    {
        $books = Book::where('customer_id', $id)->get();

        if($books->isEmpty()) {
            return response()->json(['message' => 'No books found for this user'], 404);
        }

        return response()->json($books, 200);
    }

    public function removeBook($id)
    {
        $book = Book::find($id);

        if(!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        $book->delete();

        return response()->json(['message' => 'Book removed successfully'], 200);
    }

    public function addBook(Request $request)
    {
        $request->validate([
            'apartment_id' => 'required',
            'customer_id' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'guests_quantity' => 'required'
        ]);

        $book = Book::create($request->all());

        return response()->json($book, 201);
    }
}
