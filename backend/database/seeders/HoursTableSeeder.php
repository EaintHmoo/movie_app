<?php

namespace Database\Seeders;

use App\Models\Hour;
use Illuminate\Database\Seeder;

class HoursTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $hours = [
            ["id" => 1, "title" => "1 - 5 Hours"],
            ["id" => 2, "title" => "5 - 10 Hours"],
            ["id" => 3, "title" => "10 - 15 Hours"],
            ["id" => 4, "title" => "15 - 20 Hours"],
        ];
        Hour::insert($hours);
    }
}
