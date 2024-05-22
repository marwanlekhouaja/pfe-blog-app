<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Commentaire;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Commentaire::all(); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            Commentaire::create([
                'blog_id'=>$request->blog_id,
                'user_id'=>$request->user_id,
                'comment'=>$request->comment
            ]);

            return response()->json(['message'=>'comment created successfully',201]);
        }
        catch (\Exception $e){
            return response()->json(['message'=>'failed to create comment because '.$e]);
        }
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function getSpecificComments(){
        return response()->json(['fullname'=>'marwan lk']);
    }
}
