<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
//Todos los request de este controlador
use App\Http\Requests\authenticate\RegisterAuthenticateRequest;
use App\Http\Requests\authenticate\LoginAuthenticateRequest;
//Todos los modelos usados en el controlador
use App\Models\Patient;
use App\Models\Rol;
use App\Models\User;
use Illuminate\Support\Facades\DB;
//Demas cosas extra
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthenticateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function register(RegisterAuthenticateRequest $request)
    {
        $request->validated();

        if ($request->rol_id === 2) {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->rol_id = $request->rol_id;
            $user->password = Hash::make($request->password);
        } elseif ($request->rol_id === 1) {
            $user = new Patient();
            $user->ci = $request->ci;
            $user->name = $request->name;
            $user->surname = $request->surname;
            $user->occupation = $request->occupation;
            $user->email = $request->email;
            $user->age = $request->age;
            $user->gender = $request->gender;
            $user->phone = $request->phone;
            $user->password = Hash::make($request->password);
            $user->rol_id = $request->rol_id;
        }

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
    public function login(LoginAuthenticateRequest $request)
    {
        $request->validated();

        if ($request->rol_id === 2) {
            $user = User::where('email', $request->email)->first();
        } elseif ($request->rol_id === 1) {
            $user = Patient::where('email', $request->email)->first();
        }

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 0,
                'msg' => 'El usuario es incorrecto'
            ], 404);
        } elseif ($user &&  Hash::check($request->password, $user->password)) {

            $generateToken = $user->createToken($user->email)->plainTextToken;

            return response()->json([
                'status' => 1,
                'msg' => '!Ingreso exitoso¡',
                'user' => $user,
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
    public function userProfile() //Ya esta ruta no me sirve de nada porque ya manejo el flujo de la aplicacion con react navigation y en laravel con el middleware
    {
        //Aunque es posible determinar si un usuario está autenticado usando el checkmétodo normalmente usará un middleware para verificar que el usuario esté autenticado antes de permitirle el acceso a ciertas rutas/controladores
        /* Este es un ejemplo
        Route::get('/flights', function () {
            
        })->middleware('auth'); */
        return response()->json([ //me doy cuenta que debo averiguar si el usuario está autenticado ejm if (Auth::check())
            'status' => 1,
            'msg' => 'Usuario ingresado con exito ' . auth()->user()->name,
            'data' => auth()->user(), //probaré tener tres sesiones abiertas y verificar si reconoce el usuario

        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {

        //$request->user()->currentAccessToken()->delete(); este elimina solo el token con el que inicio sesión
        //$request->user()->tokens()->delete(); este elimina todos los tokens que pueda tener el usuario acumulados
        $request->user()->tokens()->delete(); //este elimina solo el token en el que se trata
        return response()->json([
            "status" => 1,
            "msg" => "Cierre de Sesión"
        ]);
    }


    public function destroy() //Esta ruta es solo con fines de hacer pruebas de conexion
    {
        /* $medicos = DB::table('users')->join('patient_user', 'users.id', '=', 'patient_user.user_id')->join('patients', 'patients.id', '=', 'patient_user.patient_id')->where('patient_user.medicalAppointment','2022-11-06')->get(); */
        /* $usuarios = User::where('name','kevin')->patients()->first(); */
        /* $medicos = DB::table('users')->join('patient_user', 'users.id', '=', 'patient_user.user_id')->select('patient_user.hour', DB::raw('count(patient_user.id) as amount'))->where('patient_user.medicalAppointment','2022-11-07')->groupBy('patient_user.hour')->get(); Obtiene cuantas citas tiene cada horario por fecha establecida */
        /* ---------------------------------------------------------------------------------- */

        $completeCalendar = DB::table('users')->join('patient_user', 'users.id', '=', 'patient_user.user_id')->select('users.name as Especialista', 'patient_user.user_id as IdEspecialista', DB::raw('count(patient_user.user_id) as VecesSolicitado'))->where('patient_user.medicalAppointment', '2022-11-15')->where('patient_user.hour', '11:00:00')->groupBy('patient_user.user_id')->get(); //Obtiene el nombre de los doctores en cierta fecha y hora
        return response()->json([
            "calendar" => $completeCalendar,
        ]);
    }
}
