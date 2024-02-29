<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use PhpParser\Node\Expr\Cast;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            RolesTableSeeder::class,
            UsersTableSeeder::class,
            RoleUserTableSeeder::class,
            CategoriesTableSeeder::class,
            MoviesTableSeeder::class,
            YearsTableSeeder::class,
            HoursTableSeeder::class,
            CastsTableSeeder::class,
            ReviewsTableSeeder::class,
            FavouritesTableSeeder::class,
        ]);
    }
}
