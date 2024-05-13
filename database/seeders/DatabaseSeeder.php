<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'marwan',
            'email' => 'marwan@gmail.com',
            'password'=>'marwan'
        ]);
        \App\Models\User::factory()->create([
            'name' => 'ali',
            'email' => 'ali@gmail.com',
            'password'=>'ali'
        ]);
        \App\Models\User::factory()->create([
            'name' => 'aya',
            'email' => 'aya@gmail.com',
            'password'=>'ayaayaaya'
        ]);
    }
}
