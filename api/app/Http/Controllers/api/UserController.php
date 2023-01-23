<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\crud\UpdateUserSpecialistRequest;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


class UserController extends Controller
{
    public function updateSpecialist(UpdateUserSpecialistRequest $request)
    {
        $request->validated();

        $user = User::find($request->id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();


        return response()->json([
            'status' => 1,
            'msg' => 'Registro realizado con exito',
            'data' => $user
        ]);
    }
}
