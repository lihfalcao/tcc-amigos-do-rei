<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ProfessorsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            [
                'id' => 3,
                'name' => 'Berna',
                'phone' => '42912345678',
                'email' => 'berna@gmail.com',
                'type' => 'professor',
                'status' => 1,
                'login' => 'berna',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'name' => 'Rebeca',
                'phone' => '42912345679',
                'email' => 'rebeca@gmail.com',
                'type' => 'professor',
                'status' => 1,
                'login' => 'rebeca',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'name' => 'Sara Maia',
                'phone' => '42912345680',
                'email' => 'saramaia@gmail.com',
                'type' => 'professor',
                'status' => 1,
                'login' => 'saramaia',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'name' => 'Elinara',
                'phone' => '42912345681',
                'email' => 'elinara@gmail.com',
                'type' => 'professor',
                'status' => 1,
                'login' => 'elinara',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'name' => 'Dani',
                'phone' => '42912345682',
                'email' => 'dani@gmail.com',
                'type' => 'professor',
                'status' => 1,
                'login' => 'dani',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'name' => 'Lorena',
                'phone' => '42912345683',
                'email' => 'lorena@gmail.com',
                'type' => 'professor',
                'status' => 1,
                'login' => 'lorena',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 9,
                'name' => 'Lígia',
                'phone' => '42912345684',
                'email' => 'ligia@gmail.com',
                'type' => 'professor',
                'status' => 1,
                'login' => 'ligia',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 10,
                'name' => 'Sara Durau',
                'phone' => '42912345685',
                'email' => 'saradurau@gmail.com',
                'type' => 'professor',
                'status' => 1,
                'login' => 'saradurau',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 11,
                'name' => 'Juliana',
                'phone' => '42912345686',
                'email' => 'juliana@gmail.com',
                'type' => 'professor',
                'status' => 1,
                'login' => 'juliana',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 12,
                'name' => 'Mari',
                'phone' => '42912345687',
                'email' => 'mari@gmail.com',
                'type' => 'professor',
                'status' => 1,
                'login' => 'mari',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}

