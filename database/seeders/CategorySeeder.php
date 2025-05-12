<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run()
    {
        Category::insert([
            ['name' => 'Frontend', 'color' => '#34D399'],  // yeşil
            ['name' => 'Backend', 'color' => '#60A5FA'],   // mavi
            ['name' => 'Database', 'color' => '#FBBF24'],  // sarı
        ]);
    }
}
