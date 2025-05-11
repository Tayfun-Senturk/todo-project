<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use App\Models\Category;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    public function todos()
    {
        $total = Todo::count();

        $statusCounts = Todo::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get();

        $priorityCounts = Todo::select('priority', DB::raw('count(*) as count'))
            ->groupBy('priority')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'total' => $total,
                'status_counts' => $statusCounts,
                'priority_counts' => $priorityCounts
            ]
        ]);
    }

    public function categories()
    {
        $categories = Category::withCount('todos')
        ->get()
        ->makeHidden(['created_at', 'updated_at']);

    
        return response()->json([
            'status' => 'success',
            'data' => $categories
        ]);
    }

    public function priorities()
{
    $priorities = Todo::select('priority', DB::raw('count(*) as count'))
        ->groupBy('priority')
        ->pluck('count', 'priority');

    return response()->json([
        'status' => 'success',
        'data' => $priorities
    ]);
}

}
