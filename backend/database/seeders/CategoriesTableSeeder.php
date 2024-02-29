<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            [
                "id" => 1,
                "title" => "Romatic",
            ],
            [
                "id" => 2,
                "title" => "Action",
            ],
            [
                "id" => 3,
                "title" => "Horror",
            ],
            [
                "id" => 4,
                "title" => "Comedy",
            ],
            [
                "id" => 5,
                "title" => "Adventure",
            ],
            [
                "id" => 6,
                "title" => "Sport",
            ],
            [
                "id" => 7,
                "title" => "Fantasy",
            ],
            [
                "id" => 8,
                "title" => "Musical",
            ],
            [
                "id" => 9,
                "title" => "Drama",
            ],
            [
                "id" => 10,
                "title" => "Thriller",
            ],
            [
                "id" => 11,
                "title" => "Western",
            ],
            [
                "id" => 12,
                "title" => "Historical",
            ],
            [
                "id" => 13,
                "title" => "Science",
            ],
            [
                "id" => 14,
                "title" => "Mistery",
            ],

        ];

        Category::insert($categories);
    }
}
