<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClassesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('classes')->insert([
            [
                'id' => 1,
                'name' => 'Louvor',
                'start_age' => 6, // Defina a faixa etária com base em sua lógica de negócio
                'end_age' => 10,
                'shift' => 'morning',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'Babies',
                'start_age' => 3,
                'end_age' => 5,
                'shift' => 'morning',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'Primario',
                'start_age' => 7,
                'end_age' => 9,
                'shift' => 'morning',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'name' => 'Juniores',
                'start_age' => 10,
                'end_age' => 12,
                'shift' => 'afternoon',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'name' => 'Pre-Adolescentes',
                'start_age' => 13,
                'end_age' => 15,
                'shift' => 'afternoon',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}

