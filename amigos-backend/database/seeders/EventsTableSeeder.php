<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('schedule')->insert([
            [
                'id' => 1,
                'schedule' => '2023-12-03',
                'type' => 'event',
                'date' => '2023-12-03',
                'user_id' => 1, // professorId
                'class_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'schedule' => '2023-12-03',
                'type' => 'event',
                'date' => '2023-12-03',
                'user_id' => 7, // professorId
                'class_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'schedule' => '2023-12-03',
                'type' => 'event',
                'date' => '2023-12-03',
                'user_id' => 8, // professorId
                'class_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'schedule' => '2023-12-03',
                'type' => 'event',
                'date' => '2023-12-03',
                'user_id' => 9, // professorId
                'class_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'schedule' => '2023-12-03',
                'type' => 'event',
                'date' => '2023-12-03',
                'user_id' => 5, // professorId
                'class_id' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'schedule' => '2023-12-10',
                'type' => 'event',
                'date' => '2023-12-10',
                'user_id' => 6, // professorId
                'class_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'schedule' => '2023-12-10',
                'type' => 'event',
                'date' => '2023-12-10',
                'user_id' => 2, // professorId
                'class_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'schedule' => '2023-12-10',
                'type' => 'event',
                'date' => '2023-12-10',
                'user_id' => 3, // professorId
                'class_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 9,
                'schedule' => '2023-12-10',
                'type' => 'event',
                'date' => '2023-12-10',
                'user_id' => 4, // professorId
                'class_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 10,
                'schedule' => '2023-12-10',
                'type' => 'event',
                'date' => '2023-12-10',
                'user_id' => 5, // professorId
                'class_id' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 11,
                'schedule' => '2023-12-17',
                'type' => 'event',
                'date' => '2023-12-17',
                'user_id' => 1, // professorId
                'class_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 12,
                'schedule' => '2023-12-17',
                'type' => 'event',
                'date' => '2023-12-17',
                'user_id' => 7, // professorId
                'class_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 13,
                'schedule' => '2023-12-17',
                'type' => 'event',
                'date' => '2023-12-17',
                'user_id' => 8, // professorId
                'class_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 14,
                'schedule' => '2023-12-17',
                'type' => 'event',
                'date' => '2023-12-17',
                'user_id' => 9, // professorId
                'class_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 15,
                'schedule' => '2023-12-24',
                'type' => 'event',
                'date' => '2023-12-24',
                'user_id' => 2, // professorId
                'class_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 16,
                'schedule' => '2023-12-24',
                'type' => 'event',
                'date' => '2023-12-24',
                'user_id' => 4, // professorId
                'class_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 17,
                'schedule' => '2023-11-26',
                'type' => 'event',
                'date' => '2023-11-26',
                'user_id' => 7, // professorId
                'class_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
