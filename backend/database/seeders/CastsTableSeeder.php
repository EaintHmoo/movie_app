<?php

namespace Database\Seeders;

use App\Models\Cast;
use Illuminate\Database\Seeder;

class CastsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $casts = [
            [
                "id" => 1,
                "image" => "",
                "name" => "Chris Evans",
                "movie_id" => 1,
            ],
            [
                "id" => 2,
                "image" => "",
                "name" => "Emma Watson",
                "movie_id" => 1,
            ],
            [
                "id" => 3,
                "image" => "",
                "name" => "Robert Downey Jr",
                "movie_id" => 1,
            ],
            [
                "id" => 4,
                "image" => "",
                "name" => "Tom Holland",
                "movie_id" => 1,
            ],
            [
                "id" => 5,
                "image" => "",
                "name" => "Tom Hiddleston",
                "movie_id" => 1,
            ],
            [
                "id" => 6,
                "image" => "",
                "name" => "Robert Pattinson",
                "movie_id" => 1,
            ],
            [
                "id" => 7,
                "image" => "",
                "name" => "Christian Stewart",
                "movie_id" => 2,
            ],
            [
                "id" => 8,
                "image" => "",
                "name" => "Nicole kidman",
                "movie_id" => 2,
            ],
            [
                "id" => 9,
                "image" => "",
                "name" => "Tom Cruise",
                "movie_id" => 2,
            ],
            [
                "id" => 10,
                "image" => "",
                "name" => "Chris Evans",
                "movie_id" => 2,
            ],
            [
                "id" => 11,
                "image" => "",
                "name" => "Emma Watson",
                "movie_id" => 2,
            ],
            [
                "id" => 12,
                "image" => "",
                "name" => "Robert Downey Jr",
                "movie_id" => 2,
            ],
            [
                "id" => 13,
                "image" => "",
                "name" => "Tom Holland",
                "movie_id" => 2,
            ],
            [
                "id" => 14,
                "image" => "",
                "name" => "Tom Hiddleston",
                "movie_id" => 3,
            ],
            [
                "id" => 15,
                "image" => "",
                "name" => "Robert Pattinson",
                "movie_id" => 3,
            ],
            [
                "id" => 16,
                "image" => "",
                "name" => "Christian Stewart",
                "movie_id" => 3,
            ],
            [
                "id" => 17,
                "image" => "",
                "name" => "Nicole kidman",
                "movie_id" => 3,
            ],
            [
                "id" => 18,
                "image" => "",
                "name" => "Tom Cruise",
                "movie_id" => 3,
            ],
            [
                "id" => 19,
                "image" => "",
                "name" => "Chris Evans",
                "movie_id" => 4,
            ],
            [
                "id" => 20,
                "image" => "",
                "name" => "Emma Watson",
                "movie_id" => 4,
            ],
            [
                "id" => 21,
                "image" => "",
                "name" => "Robert Downey Jr",
                "movie_id" => 4,
            ],
            [
                "id" => 22,
                "image" => "",
                "name" => "Tom Holland",
                "movie_id" => 4,
            ],
            [
                "id" => 23,
                "image" => "",
                "name" => "Tom Hiddleston",
                "movie_id" => 5,
            ],
            [
                "id" => 24,
                "image" => "",
                "name" => "Robert Pattinson",
                "movie_id" => 5,
            ],
            [
                "id" => 25,
                "image" => "",
                "name" => "Christian Stewart",
                "movie_id" => 5,
            ],
            [
                "id" => 26,
                "image" => "",
                "name" => "Nicole kidman",
                "movie_id" => 5,
            ],
            [
                "id" => 27,
                "image" => "",
                "name" => "Tom Cruise",
                "movie_id" => 6,
            ],
            [
                "id" => 28,
                "image" => "",
                "name" => "Chris Evans",
                "movie_id" => 6,
            ],
            [
                "id" => 29,
                "image" => "",
                "name" => "Emma Watson",
                "movie_id" => 6,
            ],
            [
                "id" => 30,
                "image" => "",
                "name" => "Robert Downey Jr",
                "movie_id" => 6,
            ],
            [
                "id" => 31,
                "image" => "",
                "name" => "Tom Holland",
                "movie_id" => 6,
            ],
            [
                "id" => 32,
                "image" => "",
                "name" => "Tom Hiddleston",
                "movie_id" => 7,
            ],
            [
                "id" => 33,
                "image" => "",
                "name" => "Robert Pattinson",
                "movie_id" => 7,
            ],
            [
                "id" => 34,
                "image" => "",
                "name" => "Christian Stewart",
                "movie_id" => 7,
            ],
            [
                "id" => 35,
                "image" => "",
                "name" => "Nicole kidman",
                "movie_id" => 7,
            ],
            [
                "id" => 36,
                "image" => "",
                "name" => "Tom Cruise",
                "movie_id" => 7,
            ],
        ];
        Cast::insert($casts);
    }
}
