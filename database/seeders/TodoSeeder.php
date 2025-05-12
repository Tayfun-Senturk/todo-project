<?php

namespace Database\Seeders;


use App\Models\Todo;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class TodoSeeder extends Seeder
{
    public function run()
    {
        $categories = Category::all();

        foreach (range(1, 10) as $i) {
            $todo = Todo::create([
                'title' => "Seed Görev $i",
                'description' => "Açıklama $i",
                'status' => ['pending', 'in_progress', 'completed', 'cancelled'][rand(0, 3)],
                'priority' => ['low', 'medium', 'high'][rand(0, 2)],
                'due_date' => Carbon::now()->addDays(rand(-3, 10)),
            ]);


            $todo->categories()->attach($categories->random(rand(1, 2))->pluck('id'));
        }
    }
}
