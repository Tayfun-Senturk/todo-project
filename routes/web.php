<?php

use Illuminate\Support\Facades\Route;
use App\Models\Todo;
use App\Models\Category;

Route::get('/', function () {
    return view('welcome');
});


