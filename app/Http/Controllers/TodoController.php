<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreTodoRequest;
use App\Models\Todo;
use App\Http\Requests\UpdateTodoRequest;
use App\Http\Requests\UpdateTodoStatusRequest;


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
        $validated = $request->validated();

        $todo = Todo::create($validated);

        if (isset($validated['category_ids'])) {
            $todo->categories()->attach($validated['category_ids']);
        }
    
        return response()->json([
            'status' => 'success',
            'message' => 'Todo başariyla oluşturuldu',
            'data' => $todo->load('categories')
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
    public function update(UpdateTodoRequest $request,string $id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return response()->json([
                'status' => 'error',
                'message' => 'Todo bulunamadi'
            ], 404);
        }

        $validated = $request->validated();

        $todo->update($validated);

        if (isset($validated['category_ids'])) {
            $todo->categories()->sync($validated['category_ids']);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Todo güncellendi',
            'data' => $todo->load('categories')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return response()->json([
                'status' => 'error',
                'message' => 'Todo bulunamadi'
            ], 404);
        }

        $todo->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Todo silindi'
        ], 204);
    }

    public function search(Request $request)
    {
        $query = $request->query('q');
            
        if (!$query) {
            return response()->json([
                'status' => 'error',
                'message' => 'Arama belirtilmedi'
            ], 400);
        }

        $todos = Todo::where('title', 'like', "%{$query}%")
                ->orWhere('description', 'like', "%{$query}%")
                ->get();

        return response()->json([
            'status' => 'success',
            'data' => $todos
        ]);
    }

    public function updateStatus(UpdateTodoStatusRequest $request, string $id)
    {
        $todo = Todo::find($id);
        
        if (!$todo) {
            return response()->json([
                'status' => 'error',
                'message' => 'Todo bulunamadi'
            ], 404);
        }

        $todo->status = $request->validated()['status'];
        $todo->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Todo durumu güncellendi',
            'data' => [
                'id' => $todo->id,
                'status' => $todo->status,
                'updated_at' => $todo->updated_at
            ]
        ]); 
    }
}
