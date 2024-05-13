<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Blog::with('user')->get(),200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       try{
        $request->validate([
            'title'=>'required|min:3',
            "body"=>'required|min:3',
            "image"=>'nullable',
            'creatorId'=>'required'
        ]);
        
        if($request->hasFile('image')){
            $imageName=Str::random(32).".".$request->image->getClientOriginalExtension();
        }
        Blog::create([
            'title'=>$request->title,
            'body'=>$request->body,
            'image'=>$request->hasFile('image')?$imageName:null,
            'creatorId'=>$request->creatorId
        ]);
        if($request->hasFile('image')){
            Storage::disk('public')->put($imageName,file_get_contents($request->image));
        };
        return response()->json(['message'=>'blog created successfully !'],200);
       }
       catch(\Exception $e){
        return response()->json(['message'=>'somthing is wrong because '.$e],500);
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
}
