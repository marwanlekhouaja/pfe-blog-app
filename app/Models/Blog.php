<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;
    protected $fillable=['title','body','image','creatorId'];

    public function user(){
        return $this->belongsTo(User::class,'creatorId','id');
    }

    public function comments(){
        return $this->hasMany(Commentaire::class,'blog_id','id');
    }
       
}
