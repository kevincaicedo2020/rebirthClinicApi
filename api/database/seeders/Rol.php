<?php

namespace Database\Seeders;


use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class Rol extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('rols')->insert([
            ['name' => 'Paciente'],
            ['name' => 'Especialista']
            /* ['name' => 'Administrador'],
            ['name' => 'Asistente'], */
        ]);

        DB::table('users')->insert([
            [
            'name' => 'kevin',
            'email' => 'kevin.caicedo@utelvt.edu.ec',
            'password' => Hash::make('Abw12345678'),
            'rol_id' => 2
            ]
        ]);
        DB::table('patients')->insert([
            [
            'ci' => 1718785205,
            'name' => 'kevin',
            'surname' => 'caicedo',
            'occupation' => 'Diseñador gráfico',
            'email' => 'kevincaicedo29@gmail.com',
            'age' => 23,
            'gender' => 'Masculino',
            'phone' => '0989962188',
            'password' => Hash::make('Abw12345678'),
            'rol_id' => 1
            ]
        ]);
    }
}
