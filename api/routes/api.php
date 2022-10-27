<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\AuthenticateController;
use App\Http\Controllers\api\ForgotPasswordController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//Esta ruta es para las pruebas y saber si funciona el vpn o canal
Route::get('destroy', [AuthenticateController::class,'destroy']);
//Registro del equipo profesional de la clinica y login de todos los usuarios de la aplicacion
Route::post('register', [AuthenticateController::class,'register']);
Route::post('login', [AuthenticateController::class,'login']);
//Restablecer la contraseña con el correo
Route::post('/email', [ForgotPasswordController::class,'forgotPassword'])->middleware('guest')->name('password.email');;
Route::get('/email/{token}', [ForgotPasswordController::class,'SendTokenPassword'])->middleware('guest')->name('password.reset');
Route::post('/reset_password', [ForgotPasswordController::class,'UpdateResetPassword'])->middleware('guest')->name('password.update');



Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('user_profile', [AuthenticateController::class,'userProfile']);
    Route::post('logout', [AuthenticateController::class,'logout']);
});

/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); */