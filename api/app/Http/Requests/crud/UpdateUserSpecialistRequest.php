<?php

namespace App\Http\Requests\crud;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserSpecialistRequest extends FormRequest
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
            'name' => 'required|string',
            'email' => 'required|email',
        ];
    }
    public function attributes()//Sirve para modificar las variables con nombres personalizados
    {
        return [
            'name' => 'nombre',
            'email' => 'correo',
        ];
    }
}
