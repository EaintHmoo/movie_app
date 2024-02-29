<?php

namespace Database\Seeders;

use App\Models\Year;
use Illuminate\Database\Seeder;

class YearsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $years = [
            ["id" => 1, "title" => "1700 - 1800"],
            ["id" => 2, "title" => "1800 - 1900"],
            ["id" => 3, "title" => "1900 - 2000"],
            ["id" => 4, "title" => "2000 - 2010"],
            ["id" => 5, "title" => "2010 - 2030"],
        ];
        Year::insert($years);
    }
}
