<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commentaire extends Model
{
    use HasFactory;
    protected $fillable=['blog_id','user_id','comment'];

    public function blog(){
        return $this->belongsTo(Blog::class,'blog_id','id');
    }
 }
