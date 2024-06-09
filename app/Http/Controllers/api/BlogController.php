<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Models\Commentaire;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Blog::with(['user','comments.user','category','saves'])->withCount('comments')->latest()->get(),200);
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
            "image"=>'file|mimes:png,jpg,jpeg',
            'creatorId'=>'required',
            'categoryId'=>'required'
        ]);
        
        if($request->hasFile('image')){
            $imageName=Str::random(32).".".$request->image->getClientOriginalExtension();
        }
        Blog::create([
            'title'=>$request->title,
            'body'=>$request->body,
            'image'=>$request->hasFile('image')?$imageName:null,
            'creatorId'=>$request->creatorId,
            'categoryId'=>$request->categoryId
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
    public function show(string $name)
    {
        return response()->json(Blog::with(['user', 'comments.user'])->with('comments')->where('title',$name)->get(),200); 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
            $request->validate([
                'title'=>'required|min:3',
                "body"=>'required|min:3',
                "image"=>'file|mimes:png,jpg,jpeg',
                'creatorId'=>'required',
                'categoryId'=>'required'
            ]);
            
            if($request->hasFile('image')){
                $imageName=Str::random(32).".".$request->image->getClientOriginalExtension();
            }
            Blog::find($id)->update([
                'title'=>$request->title,
                'body'=>$request->body,
                'image'=>$request->hasFile('image')?$imageName:null,
                'creatorId'=>$request->creatorId,
                'categoryId'=>$request->categoryId
            ]);
            if($request->hasFile('image')){
                Storage::disk('public')->put($imageName,file_get_contents($request->image));
            };
            return response()->json(['message'=>'blog updated successfully !'],200);
           }
           catch(\Exception $e){
            return response()->json(['message'=>'somthing is wrong because '.$e],500);
           }
        }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            Blog::destroy($id);
            return response()->json(['message'=>'blog deleted successfully !'],200);
        }
        catch(\Exception $e){
            return response()->json(['message'=> 'failed to delete the blog because '.$e],500);
        }

    }

    public function getPostsUserAuthentified(Request $request){
        return response()->json(Blog::with('category')->with('user')->where('creatorId',$request->id)->get(),200);
    }

    public function search(Request $request){
        try{
            $result = Blog::with('user')->with('category')->where('title', 'LIKE', '%' . $request->search . '%')->get();
            if($result){
                return response()->json($result,200);
            }
            else{
                return response()->json(['message'=>'not found'],404);
            }
        }
        catch (\Exception $e){
            return response()->json(['message'=> 'somthing is wrong '.$e],500);
        } 
    }

    public function filterBlogsByCategory(Request $request){
        return response()->json(Blog::whereHas('category',function ($query) use ($request){
            $query->where('type',$request->category);
        })->with('user')->get(),200);
    }

    public function getCommentsOfSpecificBlog(Request $request){
        $comments=Commentaire::where('blog_id',$request->idblog)->get();
        if(count($comments)>0){
            return response()->json($comments,200);
        }
        else{
            return response()->json(['message'=> 'no comments found in this blog'],404);
        }
    }
}
