<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Save;

class Blog extends Model
{
    use HasFactory;
    protected $fillable=['title','body','image','creatorId','categoryId'];

    public function user(){
        return $this->belongsTo(User::class,'creatorId','id');
    }

    public function comments(){
        return $this->hasMany(Commentaire::class,'blog_id','id');
    }

    public function category(){
        return $this->belongsTo(Category::class,'categoryId','id'); 
    }

    public function saves(){
        return $this->hasMany(Save::class,'blog_id');
    }
       
}
