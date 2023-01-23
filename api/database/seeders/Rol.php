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
            'name' => 'Dr. Jonathan',
            'email' => 'jonathan@hotmail.com',
            'password' => Hash::make('Abw12345678'),
            'rol_id' => 2
            ],
            [
            'name' => 'Dr. Michael',
            'email' => 'michael@hotmail.com',
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
            ],
            [
            'ci' => 1718454223,
            'name' => 'paul',
            'surname' => 'francis',
            'occupation' => 'Diseñador',
            'email' => 'kevincaicedo30@gmail.com',
            'age' => 22,
            'gender' => 'Masculino',
            'phone' => '0989962188',
            'password' => Hash::make('Abw12345678'),
            'rol_id' => 1
            ],
            [
            'ci' => 1218434346,
            'name' => 'Julian',
            'surname' => 'pablo',
            'occupation' => 'Militar',
            'email' => 'kevincaicedo31@gmail.com',
            'age' => 29,
            'gender' => 'Masculino',
            'phone' => '0989963188',
            'password' => Hash::make('Abw12345678'),
            'rol_id' => 1
            ],
            [
            'ci' => 145345678,
            'name' => 'pruebas',
            'surname' => 'prueeas',
            'occupation' => 'Abogado',
            'email' => 'prueba@gmail.com',
            'age' => 23,
            'gender' => 'Femenino',
            'phone' => '0967346275',
            'password' => Hash::make('Abw12345678'),
            'rol_id' => 1
            ]
        ]);
        DB::table('patient_user')->insert([
            [
            'dateIdentifier' => 0,
            'medicalAppointment' => '2022-11-29',
            'hour' => '10:00:00',
            'patient_id' => 4,
            'user_id' => 2
            ],
            [
                'dateIdentifier' => 2,
                'medicalAppointment' => '2022-11-29',
                'hour' => '11:00:00',
                'patient_id' => 2,
                'user_id' => 2
            ],
            [
                'dateIdentifier' => 1,
                'medicalAppointment' => '2022-11-29',
                'hour' => '10:30:00',
                'patient_id' => 3,
                'user_id' => 1
            ],
            [
            'dateIdentifier' => 3,
            'medicalAppointment' => '2022-11-29',
            'hour' => '11:30:00',
            'patient_id' => 1,
            'user_id' => 1
            ],
            [
            'dateIdentifier' => 0,
            'medicalAppointment' => '2022-12-06',
            'hour' => '10:00:00',
            'patient_id' => 3,
            'user_id' => 2
            ],
            [
            'dateIdentifier' => 0,
            'medicalAppointment' => '2022-12-13',
            'hour' => '10:00:00',
            'patient_id' => 3,
            'user_id' => 1
            ],
            [
            'dateIdentifier' => 0,
            'medicalAppointment' => '2022-12-20',
            'hour' => '10:00:00',
            'patient_id' => 3,
            'user_id' => 1
            ],
        ]);
    }
}
