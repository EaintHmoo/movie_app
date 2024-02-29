<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [UserAuthController::class, 'register']);
Route::post('login', [UserAuthController::class, 'login']);
Route::post('logout', [UserAuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['as' => 'api.', 'middleware' => ['auth:sanctum']], function () {
    Route::post('logout', [UserAuthController::class, 'logout']);
    Route::put('password/update', [UserAuthController::class, 'changePassword']);
    Route::put('profile/update', [UserAuthController::class, 'updateProfile']);
    Route::delete('users/delete-account', [UserAuthController::class, 'deleteAccount']);
    Route::get('movies/favourite-movies', [MovieController::class, 'favourite_movies']);
    Route::put('favourite-movies/addorremove', [MovieController::class, 'toggle_favourite']);
});

// Users
Route::get('users', [UserAuthController::class, 'index']);
Route::put('users/{user}/approve', [UserAuthController::class, 'approve']);
Route::delete('users/{user}', [UserAuthController::class, 'destory']);


//Movie
Route::get('movies', [MovieController::class, 'index']);
Route::get('movies/random', [MovieController::class, 'randomMovies']);
Route::get('movies/{movie}', [MovieController::class, 'show']);
Route::get('calculate-count', [MovieController::class, 'calculateCount']);
Route::post('movies', [MovieController::class, 'store']);
Route::put('movies/{movie}', [MovieController::class, 'update']);
Route::delete('movies/{movie}', [MovieController::class, 'destory']);


//Category
Route::get('categories', [CategoryController::class, 'index']);
Route::post('categories', [CategoryController::class, 'store']);
Route::put('categories/{category}', [CategoryController::class, 'update']);
Route::delete('categories/{category}', [CategoryController::class, 'destory']);

//Reviews
Route::post('reviews', [ReviewController::class, 'store']);
