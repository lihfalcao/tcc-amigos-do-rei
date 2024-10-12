<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            [
                'id' => 2,
                'name' => 'Lígia',
                'phone' => '42999997277', // Adapte conforme necessário
                'email' => 'lih.falcao@hotmail.com',
                'type' => 'admin',
                'status' => 1,
                'login' => 'lihfalcao',
                'password' => Hash::make('abc123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
