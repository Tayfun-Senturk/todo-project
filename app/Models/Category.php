<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Todo;
class Category extends Model
{

    protected $fillable = ['name'];
    //
    public function todos()
    {
        return $this->belongsToMany(Todo::class,'todo_category');
    }
}
