<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\AuthenticateController;
use App\Http\Controllers\api\ForgotPasswordController;
use App\Http\Controllers\api\PatientController;
use App\Http\Controllers\PatientUserController;

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
Route::get('destroy', [AuthenticateController::class, 'destroy']);
//Registro del equipo profesional de la clinica y login de todos los usuarios de la aplicacion
Route::post('register', [AuthenticateController::class, 'register']);
Route::post('login', [AuthenticateController::class, 'login']);
//Restablecer la contraseña con el correo
Route::post('/email', [ForgotPasswordController::class, 'forgotPassword'])->middleware('guest')->name('password.email');;
Route::get('/email/{token}', [ForgotPasswordController::class, 'SendTokenPassword'])->middleware('guest')->name('password.reset');
Route::post('/reset_password', [ForgotPasswordController::class, 'UpdateResetPassword'])->middleware('guest')->name('password.update');



Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('user_profile', [AuthenticateController::class, 'userProfile']);
    Route::post('logout', [AuthenticateController::class, 'logout']);

    //Lista de agenda con las citas medicas reservadas para los pacientes
    Route::get('listAgendaSchedule', [PatientUserController::class, 'listAgendaFull']); //lista toda la info para la agenda
    Route::post('medicalAppointmentDateHour', [PatientUserController::class, 'medicalAppointmentByDateAndTime']); //lista informacion por fecha y hora
    Route::post('insertPatientMedicalAppointment', [PatientUserController::class, 'insertPatientSchedule']); //inserta una cita medica
    Route::post('listMessageAgendaPatientUser', [PatientUserController::class, 'listMessageAgendaPatient']); //inserta una cita medica
    //Lista los pacientes que agendarón citas medicas para los especialistas
    Route::post('listPatientsAgendaSpecialist', [PatientUserController::class, 'listPatientsAgendaFull']); //Lista los pacientes que agendaron con su respectivo especialista
    Route::post('listAgendaDone', [PatientUserController::class, 'listAgendaPatient']); //Lista los pacientes que agendaron con su respectivo especialista
    //Colocar y subir la imagen de perfil del usuario final
    Route::post('imageStorePatient', [PatientController::class, 'postImage']); //Usuario paciente
    Route::put('updateUserPatient', [PatientController::class, 'updatePatient']); //Usuario paciente
    Route::put('updateUserSpecialist', [UserController::class, 'updateSpecialist']); //Usuario especialista
});

/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); */