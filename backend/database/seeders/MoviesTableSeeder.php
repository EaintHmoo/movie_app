<?php

namespace Database\Seeders;

use App\Models\Movie;
use Illuminate\Database\Seeder;

class MoviesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $movies = [
            [
                "id" => 1,
                "name" => "Army of The Dead",
                "description" => "Lorem ipsum dolor sit amet, consecetur adipiscing elseddo eiusmod There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration.",
                "title_image" => "",
                "image" => "",
                "category_id" => 1,
                "language" => "English",
                "year" => "2022",
                "time" => "3",
                "video" => null,
                "rate" => 3.4,
            ],

            [
                "id" => 2,
                "name" => "Lucifer",
                "description" => "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
                "title_image" => "",
                "image" => "",
                "category_id" => 2,
                "language" => "English",
                "year" => "2020",
                "time" => "4",
                "video" => null,
                "rate" => 3.4,
            ],
            [
                "id" => 3,
                "name" => "Wonka",
                "description" => "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
                "title_image" => "",
                "image" => "",
                "category_id" => 3,
                "language" => "English",
                "year" => "2024",
                "time" => "4",
                "video" => null,
                "rate" => 5,
            ],
            [
                "id" => 4,
                "name" => "Aquaman and the Lost Kingdom",
                "description" => "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
                "title_image" => "",
                "image" => "",
                "category_id" => 1,
                "language" => "English",
                "year" => "2022",
                "time" => "4",
                "video" => null,
                "rate" => 4,
            ],
            [
                "id" => 5,
                "name" => "The Iron Claw",
                "description" => "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
                "title_image" => "",
                "image" => "",
                "category_id" => 2,
                "language" => "English",
                "year" => "2023",
                "time" => "4",
                "video" => null,
                "rate" => 3.4,
            ],
            [
                "id" => 6,
                "name" => "Barbie",
                "description" => "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
                "title_image" => "",
                "image" => "",
                "category_id" => 3,
                "language" => "English",
                "year" => "2023",
                "time" => "4",
                "video" => null,
                "rate" => 4.8,
            ],
            [
                "id" => 7,
                "name" => "The Conjuring",
                "description" => "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
                "title_image" => "",
                "image" => "",
                "category_id" => 1,
                "language" => "English",
                "year" => "2020",
                "time" => "4",
                "video" => null,
                "rate" => 3.4,
            ],
        ];
        Movie::insert($movies);
    }
}
