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
        // Retrieve the user along with their blogs and categories
        $user = User::with([
            'blogs' => function ($query) {
                // Include blogs with their categories
                $query->with('category');
            }
        ])->find($id);

        // If the user is found, return only the blogs and their categories
        if ($user) {
            return response()->json($user->blogs, 200);
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
            $request->validate([
                'name'=>'required|min:3',
                "email"=>'required|min:3',
                "image"=>'',
                'bio'=>'',
            ]);

            if ($request->hasFile('image')) {
                $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();
            }
            User::find($id)->update([
                'name' => $request->name,
                'email' => $request->email,
                'image' => $request->hasFile('image') ? $imageName : null,
                'bio' => $request->bio,
            ]);
            if ($request->hasFile('image')) {
                Storage::disk('public')->put($imageName, file_get_contents($request->image));
            }
            ;
            return response()->json(['message' => 'blog created successfully !'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'somthing is wrong because ' . $e], 500);
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
