<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::get();
        return response()
            ->json([
                'data' => CategoryResource::collection($categories),
                'status' => Response::HTTP_OK,
            ], Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string'
        ]);

        $category = Category::create([
            'title' => $request->title
        ]);

        return response()
            ->json([
                'data' => new CategoryResource($category),
                'message' => 'Category created successfully',
                'status' => Response::HTTP_CREATED
            ], Response::HTTP_CREATED);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'title' => 'required|string'
        ]);

        $category->update([
            'title' => $request->title
        ]);

        return response()
            ->json([
                'data' => new CategoryResource($category),
                'message' => 'Category updated successfully',
                'status' => Response::HTTP_OK
            ], Response::HTTP_OK);
    }

    public function  destory(Category $category)
    {
        $category->delete();
        return response()
            ->json([
                'message' => 'Category deleted successfully',
                'status' => Response::HTTP_OK
            ], Response::HTTP_OK);
    }
}
