<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Category;

class Todo extends Model
{
    use SoftDeletes;
    protected $with = ['categories'];


    protected $fillable = [
        'title',
        'description',
        'status',
        'priority',
        'due_date',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class,'todo_category');
    }
}
