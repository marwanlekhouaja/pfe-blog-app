<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Category::all(), 200);
    }

    public function listCategories(){
        return response()->json(Category::select('type')->distinct()->get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
            Category::find($id)->update([
                'name'=>$request->name,
                'type'=>$request->type
            ]);
        }
        catch(\Exception $exception){
            return response()->json(['message'=>'failed to update the category because '.$exception],500);
        } 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            Category::find($id)->delete();
        }
        catch(\Exception $exception){
            return response()->json(['message'=>'failed to delete the category because '.$exception],500);
        }
    }
}
