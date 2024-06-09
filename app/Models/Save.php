<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Save extends Model
{
    use HasFactory;

    protected $fillable=['user_id','blog_id'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function blog(){
        return $this->belongsTo(Blog::class,'blog_id','id');
    } 
}
