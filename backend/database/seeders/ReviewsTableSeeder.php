<?php

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $reviews = [
            [
                "id" => 1,
                "user_id" => 2,
                "movie_id" => 1,
                "rate" => 2,
                "message" => "Lorem ipsum dolor sit amet, consecetur adipiscing elseddo eiusmod There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration.",
            ],
            [
                "id" => 2,
                "user_id" => 2,
                "movie_id" => 2,
                "rate" => 3.5,
                "message" => "Lorem ipsum dolor sit amet, consecetur adipiscing elseddo eiusmod There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration.",
            ],
            [
                "id" => 3,
                "user_id" => 2,
                "movie_id" => 3,
                "rate" => 4,
                "message" => "Lorem ipsum dolor sit amet, consecetur adipiscing elseddo eiusmod There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration.",
            ],
        ];

        Review::insert($reviews);
    }
}
