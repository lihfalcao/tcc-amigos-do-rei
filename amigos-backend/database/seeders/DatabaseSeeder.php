<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            UsersTableSeeder::class,
            ProfessorsTableSeeder::class,
            ClassesTableSeeder::class,
            EventsTableSeeder::class,
            ThemesTableSeeder::class,
        ]);
    }
}
