<?php

use App\Http\Controllers\api\BlogController;
use App\Http\Controllers\api\CategoryController;
use App\Http\Controllers\api\SaveController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\CommentController;
use App\Models\Category;
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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('users',UserController::class);
Route::apiResource('blog',BlogController::class);
Route::apiResource('commentaire',CommentController::class);
Route::apiResource('categories',CategoryController::class);
Route::get('commentaire/show',[CommentController::class,'getSpecificComments']);
Route::apiResource('saves',SaveController::class);
Route::get('postsuser/{id}',[BlogController::class,'getPostsUserAuthentified']);
Route::get('blogs/{search}',[BlogController::class,'search']);
Route::get('blogs/category/{category}',[BlogController::class,'filterBlogsByCategory']);

Route::get('list_categories',[CategoryController::class,'listCategories']);