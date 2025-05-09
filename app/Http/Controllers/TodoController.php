<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreTodoRequest;
use App\Models\Todo;


class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todos = Todo::all();
        
        return response()->json(['status' => 'success', 'data' => $todos]);
    }

    /**
     * Store a newly created resource in storage.
     */
    

    public function store(StoreTodoRequest $request)
    {
        $todo = Todo::create($request->validated());
    
        return response()->json([
            'status' => 'success',
            'message' => 'Todo başariyla oluşturuldu',
            'data' => $todo
        ], 201);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return response()->json([
                'status' => 'error',
                'message' => 'Todo bulunamadi'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $todo
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
