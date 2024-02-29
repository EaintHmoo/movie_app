<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Movie;
use Illuminate\Http\Request;
use App\Http\Resources\ReviewResource;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'rate' => 'required',
            'message' => 'required',
            'user_id' => 'required|numeric',
            'movie_id' => 'required|numeric',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->toJson(),
                'status' => Response::HTTP_BAD_REQUEST
            ], Response::HTTP_BAD_REQUEST);
        }
        // return $request;
        $movie = Movie::find($request->movie_id);
        $movie->commented_users()->attach($request->user_id, [
            'rate' => $request->rate,
            'message' => $request->message,
        ]);
        return response()
            ->json([
                'reviews' => ReviewResource::collection($movie->reviews),
                'status' => Response::HTTP_OK
            ], Response::HTTP_OK);
    }
}
