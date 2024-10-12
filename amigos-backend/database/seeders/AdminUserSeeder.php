<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User; 

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        if (!User::where('login', 'admin')->exists()) {
            User::create([
                'name' => 'Admin',
                'phone' => '1234567890', 
                'email' => 'admin@example.com',
                'type' => 'admin',
                'status' => 1, 
                'login' => 'admin', 
                'password' => Hash::make('admin'), 
            ]);
        }
    }
}

