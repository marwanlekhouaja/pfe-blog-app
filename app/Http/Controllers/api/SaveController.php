<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use App\Models\Save;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class SaveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Save::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            if($request->hasFile('image')){
                $imageName=Str::random(32).".".$request->image->getClientOriginalExtension();
            }
            Save::create([
                'user_id' => $request->user_id,
                'blog_id' => $request->blog_id,
                
            ]);
            if($request->hasFile('image')){
                Storage::disk('public')->put($imageName,file_get_contents($request->image));
            };
    
            return response()->json(['message'=>'new saved !'],201);
        }
        catch( Exception $e){
            return response()->json(['message'=>'error store new saved because '.$e],500);
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
        try{
            Save::where('blog_id',$id)->delete();
            return response()->json(['message'=> 'saved successfully !'],200);
        }
        catch(Exception $e){
            return response()->json('error server',500);
        }
    }
}
