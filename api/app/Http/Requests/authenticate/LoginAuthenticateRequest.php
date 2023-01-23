<?php

namespace App\Http\Requests\authenticate;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class LoginAuthenticateRequest extends FormRequest
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
            'rol_id' => 'required|not_in:0',
            'email' => 'required|email',
            'password' => ['required', Password::min(8)->mixedCase()->letters()->numbers()->uncompromised(),],
        ];
    }

    public function attributes()//Sirve para modificar las variables con nombres personalizados
    {
        return [
            'email' => 'correo',
            'password' => 'contraseña',
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
