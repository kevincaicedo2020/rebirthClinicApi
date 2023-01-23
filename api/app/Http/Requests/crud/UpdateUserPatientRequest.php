<?php

namespace App\Http\Requests\crud;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserPatientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'ci' => 'required|numeric|digits:10',
            'name' => 'required|string',
            'surname' => 'required|string',
            'occupation' => 'required|string',
            'email' => 'required|email',
            'age' => 'required|numeric',
            'gender' => 'required|string',
            'phone' => 'required|numeric|digits:10'
        ];
    }
    public function attributes()//Sirve para modificar las variables con nombres personalizados
    {
        return [
            'ci' => 'cedula',
            'name' => 'nombre',
            'surname' => 'apellido',
            'occupation' => 'ocupación',
            'email' => 'correo',
            'age' => 'edad',
            'gender' => 'genero',
            'phone' => 'celular'
        ];
    }
}
