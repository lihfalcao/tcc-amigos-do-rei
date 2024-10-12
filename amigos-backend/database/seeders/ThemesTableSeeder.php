<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ThemesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('themes')->insert([
            [
                'id' => 1,
                'name' => 'Natal 1 - A árvore perfeita',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'Natal 2 - O perfeito lugar',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'Natal 3 - A Perfeita Luz',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'name' => 'Teste',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'name' => 'Tema teste',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}

