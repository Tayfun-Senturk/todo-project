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
    public function index(Request $request)
    {
        $page = (int) $request->query('page', 1);
        $perPage = min((int) $request->query('per_page', 5), 50);
        $sort = $request->query('sort', 'created_at');
        $order = strtolower($request->query('order', 'desc')) === 'asc' ? 'asc' : 'desc';

        $allowedSorts = ['created_at', 'due_date', 'priority'];
        if (!in_array($sort, $allowedSorts, true)) {
            return response()->json([
                'status' => 'error',
                'message' => "Geçersiz sort alanı: $sort",
            ], 422);
        }

        $query = Todo::with('categories')
            ->when($request->filled('status'), fn ($q) => $q->where('status', $request->status))
            ->when($request->filled('priority'), fn ($q) => $q->where('priority', $request->priority))
            ->when($request->filled('category_id'), function ($q) use ($request) {
                $q->whereHas('categories', function ($q) use ($request) {
                    $q->where('categories.id', $request->category_id);
                });
            })
            ->orderBy($sort, $order);

        $paginated = $query->paginate($perPage, ['*'], 'page', $page);

        $meta = [
            'pagination' => [
                'total' => $paginated->total(),
                'per_page' => $paginated->perPage(),
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'from' => $paginated->firstItem(),
                'to' => $paginated->lastItem(),
            ],
        ];

        return response()->json([
            'status' => 'success',
            'data' => $paginated->items(),
            'meta' => $meta
        ]);
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
        $status = $request->query('status');
        $priority = $request->query('priority');
        $category_id = $request->query('category_id');

        if (!$query) {
            return response()->json([
                'status' => 'error',
                'message' => 'Arama belirtilmedi'
            ], 400);
        }

        $todos = Todo::where(function($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                  ->orWhere('description', 'like', "%{$query}%");
            })
            ->when($status, fn($q) => $q->where('status', $status))
            ->when($priority, fn($q) => $q->where('priority', $priority))
            ->when($category_id, function($q) use ($category_id) {
                $q->whereHas('categories', function($q) use ($category_id) {
                    $q->where('categories.id', $category_id);
                });
            })
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
