<?php

namespace App\Http\Requests\authenticate;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterAuthenticateRequest extends FormRequest
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
            'email' => 'required|email|unique:patients,email',
            'age' => 'required|numeric',
            'gender' => 'required|string',
            'phone' => 'required|numeric|digits:10',
            'password' => ['required', Password::min(8)->mixedCase()->letters()->numbers()->uncompromised(),],
            'password_confirmation' => 'required|confirmed',
            'rol_id' => 'required',
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
            'phone' => 'celular',
            'password' => 'contraseña',
            'password_confirmation' => 'confirmar contraseña'
        ];
    }
    //Sirve para modificar un mensaje completo sobre un tipo de error
    public function messages()
    {
        return [
            'rol_id.not_in' => 'Seleccione el tipo de usuario.',
            'password.required' => 'La contraseña es obligatoria.',
        ];
    }
}
