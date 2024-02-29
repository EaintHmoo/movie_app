<?php

namespace App\Http\Controllers;

use App\Models\Cast;
use App\Models\User;
use App\Models\Movie;
use App\Models\Category;
use App\Helper\FileUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\MovieResource;
use App\Http\Resources\ShowMovieResource;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;

class MovieController extends Controller
{
    public function index(Request $request)
    {
        $movies = Movie::with('category:id,title')->orderBy('id', 'desc');
        if ($request->key) {
            $movies = $movies->where('name', 'like', '%' . $request->key . '%');
        }
        return response()
            ->json([
                'data' => MovieResource::collection($movies->get()),
                'status' => Response::HTTP_OK
            ]);
    }

    public function show(Movie $movie)
    {
        $movie->load('category', 'reviews', 'casts');
        $related_movies = Movie::where('category_id', $movie->category_id)->where('id', '<>', $movie->id)->get();
        return response()
            ->json([
                'data' => new ShowMovieResource($movie, $related_movies),
                'status' => Response::HTTP_OK
            ]);
    }

    public function randomMovies()
    {
        $movies = Movie::inRandomOrder()->limit(10)->get();
        return response()
            ->json([
                'data' => MovieResource::collection($movies),
                'status' => Response::HTTP_OK
            ]);
    }

    public function calculateCount()
    {
        return response()
            ->json([
                'movies_count' => Movie::count(),
                'categories_count' => Category::count(),
                'users_count' => User::count(),
            ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required',
            'description'   => 'required',
            'title_image'   => 'required',
            'image' => 'required',
            'category'   => 'required',
            'language'  => 'required',
            'year'  => 'required',
            'time'  => 'required',
            'casts'  => 'required',
        ]);

        try {
            DB::beginTransaction();
            $movie = new Movie();
            $movie->name = $request->name;
            $movie->description = $request->description;
            $movie->category_id = $request->category;
            $movie->language = $request->language;
            $movie->year = $request->year;
            $movie->time = $request->time;

            if ($request->file('image', false)) {
                $movie->image = FileUpload::upload('movie', $request->image);
            }

            if ($request->file('title_image', false)) {
                $movie->title_image = FileUpload::upload('movie', $request->title_image);
            }

            if ($request->file('video', false)) {
                $movie->video = FileUpload::upload('movie', $request->video);
            }
            $movie->save();

            if ($request->casts) {
                foreach ($request->casts as $cast) {
                    $castObj = new Cast();
                    $castObj->name = $cast["name"];
                    $castObj->movie_id = $movie->id;
                    if ($cast["image"] && $cast["image"] !== 'null') {
                        $castObj->image = FileUpload::upload('movie', $cast["image"]);
                    }
                    $castObj->save();
                }
            }

            DB::commit();
            return response()
                ->json([
                    'data' => new MovieResource($movie),
                    'message' => 'Movie created successfully',
                    'status' => Response::HTTP_CREATED
                ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
            return $e;
            return response()
                ->json([
                    'message' => 'Fail to updata',
                    'status' => 500
                ], 500);
        }
    }

    public function update(Request $request, Movie $movie)
    {
        $request->validate([
            'name'  => 'required',
            'description'   => 'required',
            'category'   => 'required',
            'language'  => 'required',
            'year'  => 'required',
            'time'  => 'required',
        ]);

        try {
            DB::beginTransaction();
            $movie->name = $request->name;
            $movie->description = $request->description;
            $movie->category_id = $request->category;
            $movie->language = $request->language;
            $movie->year = $request->year;
            $movie->time = $request->time;

            if ($request->file('image', false)) {
                if ($movie->image) {
                    FileUpload::delete($movie->image);
                }
                $movie->image = FileUpload::upload('movie', $request->image);
            }

            if ($request->file('title_image', false)) {
                if ($movie->title_image) {
                    FileUpload::delete($movie->title_image);
                }
                $movie->title_image = FileUpload::upload('movie', $request->title_image);
            }

            if ($request->file('video', false)) {
                if ($movie->video) {
                    FileUpload::delete($movie->video);
                }
                $movie->video = FileUpload::upload('movie', $request->video);
            }
            $movie->save();

            DB::commit();
            return response()
                ->json([
                    'data' => new MovieResource($movie),
                    'message' => 'Movie updated successfully',
                    'status' => Response::HTTP_OK
                ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return $e;
            return response()
                ->json([
                    'message' => 'Fail to updata',
                    'status' => 500
                ], 500);
        }
    }

    public function  destory(Movie $movie)
    {
        $movie->delete();
        return response()
            ->json([
                'message' => 'Movie deleted successfully',
                'status' => Response::HTTP_OK
            ], Response::HTTP_OK);
    }

    public function favourite_movies()
    {
        $movies = auth()->user()->favourite_movies;
        return response()
            ->json([
                'data' => MovieResource::collection($movies),
                'status' => Response::HTTP_OK
            ]);
    }

    public function toggle_favourite(Request $request)
    {
        $request->validate([
            'movie_id' => 'required|numeric'
        ]);
        $message = "";
        if (auth()->user()->favourite_movies()->where('movie_id', $request->movie_id)->exists()) {
            auth()->user()->favourite_movies()->detach($request->movie_id);
            $message = 'Movie remove from favorite successfully';
        } else {
            auth()->user()->favourite_movies()->attach($request->movie_id);
            $message = 'Movie add to favorite successfully';
        }
        return response()->json([
            'message' => $message,
            'count' => auth()->user()->favourite_movies->count(),
            'status' => Response::HTTP_OK,
        ], Response::HTTP_OK);
    }
}
