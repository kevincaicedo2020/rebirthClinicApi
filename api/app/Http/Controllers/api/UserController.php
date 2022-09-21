<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();
        
        return response()->json([
            'status' => 1,
            'msg' => 'Registro realizado con exito'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {    
            return response()->json([
                'status' => 0,
                'msg' => 'El usuario es incorrecto'
            ], 404);
        }elseif ($user &&  Hash::check($request->password, $user->password)) {
            
            $generateToken = $user->createToken($user->email)->plainTextToken;
            
            return response()->json([
                'status' => 1,
                'msg' => 'Bienvenido!!',
                'access_token' => $generateToken,
            ]);
        }
        
        return response()->json([
            'status' => 0,
            'msg' => 'No pudo ingresar'
        ], 404);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function userProfile()
    {                            
        //Aunque es posible determinar si un usuario está autenticado usando el checkmétodo normalmente usará un middleware para verificar que el usuario esté autenticado antes de permitirle el acceso a ciertas rutas/controladores
        /* Este es un ejemplo
        Route::get('/flights', function () {
            
        })->middleware('auth'); */
        return response()->json([//me doy cuenta que debo averiguar si el usuario está autenticado ejm if (Auth::check())
            'status' => 1,
            'msg' => 'Usuario ingresado con exito',
            'data' => auth()->user()//probaré tener tres sesiones abiertas y verificar si reconoce el usuario
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request){
        
        //$request->user()->tokens()->delete(); este elimina todos los tokens que pueda tener el usuario acumulados
        $request->user()->currentAccessToken()->delete(); //este elimina solo el token en el que se trata
        return response()->json([
            "status" => 1,
            "msg" => "Cierre de Sesión" 
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
