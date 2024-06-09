<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(User::with('blogs')->get(), 200);
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
        // Retrieve the user along with their blogs and saved blogs
        $user = User::with([
            'blogs.category', // Include blogs with their categories
            'saves.blog.category' // Include saved blogs with their categories
        ])->find($id);
    
        // If the user is found, return only the blogs and saves columns
        if ($user) {
            return response()->json([
                'blogs' => $user->blogs,
                'saves' => $user->saves
            ], 200);
        }
    
        // If user not found, return a 404 response
        return response()->json(['message' => 'User not found'], 404);
    }
    


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    try {
        // Validate the request
        $validated = $request->validate([
            'name' => 'required|min:3',
            'email' => 'required|email|min:3',
            "image"=>'file|mimes:png,jpg,jpeg',
            'bio' => 'nullable|string',
        ]);

        // Find the user
        $user = User::find($id);

        // // Handle image upload if present
        $imageName = $user->image; // Default to existing image
        if ($request->hasFile('image')) {
            $imageFile = $request->file('image');
            $imageName = Str::random(32) . '.' . $imageFile->getClientOriginalExtension();
       }

        // Update the user
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'image' => $request->hasFile('image')?$imageName:$user->image,
            'bio' => $validated['bio'] ?? $user->bio,
        ]);

        if($request->hasFile('image')){
            Storage::disk('public')->put($imageName,file_get_contents($request->image));
        };

        return response()->json(['message' => 'User updated successfully!','user'=>$user], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Something went wrong: ' . $e->getMessage()], 500);
    }
}



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
