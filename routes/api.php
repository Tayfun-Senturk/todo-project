<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\CategoryController;

Route::get('/todos/search',[TodoController::class,'search']);
Route::get('/todos', [TodoController::class, 'index']);
Route::get('/todos/{id}',[TodoController::class,'show']);
Route::put('/todos/{id}',[TodoController::class,'update']);
Route::delete('/todos/{id}',[TodoController::class,'destroy']);
Route::post('/todos',[TodoController::class,'store']);
Route::patch('/todos/{id}/status', [TodoController::class, 'updateStatus']);
Route::apiResource('categories', CategoryController::class);