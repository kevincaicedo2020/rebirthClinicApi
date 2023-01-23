<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\PatientUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PatientUserController extends Controller
{
    //TODO ESTO ES PARA EL LAS PANTALLAS DEL PACIENTE
    public function listAgendaFull() //Obtiene la lista de citas agendadas para mostrar en la agenda 
    {
        $completeCalendar = DB::table('patient_user')->select('patient_user.hour', 'patient_user.dateIdentifier', DB::raw('count(patient_user.id) as amount, patient_user.medicalAppointment'))->groupBy('patient_user.hour', 'patient_user.medicalAppointment', 'patient_user.dateIdentifier')->get(); //Obtiene todo el calendario (fechas-horarios)

        return response()->json([
            "calendar" => $completeCalendar
        ]);
    }

    public function medicalAppointmentByDateAndTime(Request $request) //Obtiene la informacion exacta por dia y hora 
    {
        $hora = substr($request->hour, 0, 5);
        $medicalAppointment = DB::table('users')->join('patient_user', 'users.id', '=', 'patient_user.user_id')->select('users.email as Especialista', DB::raw('count(patient_user.user_id) as VecesSolicitado'))->where('patient_user.medicalAppointment', $request->day)->where('patient_user.hour', $hora)->where('patient_user.dateIdentifier', $request->idListAgenda)->groupBy('patient_user.user_id')->get(); //Obtiene el nombre de los doctores en cierta fecha y hora
        if (count($medicalAppointment) >= 2) {
            return response()->json([
                "msg" => 'Cupos llenos',
                "res" => 0
            ]);
        } elseif (count($medicalAppointment) == 0) {
            return response()->json([
                "msg" => 'Habilitado',
                "res" => 0
            ]);
        }
        return response()->json([
            "specialist" => $medicalAppointment,
            "res" => 1
        ]);
    }

    public function insertPatientSchedule(Request $request)
    {
        $valor = PatientUser::where('patient_id', $request->UserId)->where('medicalAppointment', $request->day)->exists();
        if ($valor) {
            return response()->json([
                "res" => 0,
                "msg" => 'Ya tiene reservada una cita médica'
            ]);
        } else {
            $specialist = User::select('id')->where('name', $request->nameSpecialist)->get();
            $patient = Patient::find($request->UserId);
            $patient->users()->attach($specialist, ['medicalAppointment' => $request->day, 'hour' => $request->hour, 'dateIdentifier' => $request->idListAgenda]);
            return response()->json([
                "res" => 1,
                "msg" => 'Agendamiento de citas médica exitosa',
                "specialist" => $specialist
            ]);
        }
    }

    public function listMessageAgendaPatient(Request $request) //Obtiene la lista para la mensajeria con los especialistas correspondientes
    {
        $patientListMessageSpecialist = DB::table('patient_user')->select('patient_user.user_id')->where('patient_user.patient_id', $request->id)->groupBy('patient_user.patient_id', 'patient_user.user_id')->get(); //Para la vista se obtiene el contacto de los especialistas para mostarlos 

        return response()->json([
            "patientMessageSpecialist" => $patientListMessageSpecialist
        ]);
    }

    public function listAgendaPatient(Request $request) //Obtiene la lista para la mensajeria con los especialistas correspondientes
    {
        $patientListMessageSpecialist = DB::table('patient_user')->join('users', 'users.id', '=', 'patient_user.user_id')->select('patient_user.medicalAppointment', 'patient_user.hour', 'users.name')->where('patient_user.patient_id', $request->id)->get(); //Para la vista se obtiene el contacto de los especialistas para mostarlos 

        return response()->json([
            "patientMessageSpecialist" => $patientListMessageSpecialist
        ]);
    }

    //TODO ESTO ES PARA EL LAS PANTALLAS DEL ESPECIALISTA
    public function listPatientsAgendaFull(Request $request) //Obtiene la lista de los pacientes que agendaron una cita médica con su respectivo cirujano 
    {
        $completeCalendar = DB::table('patients')->join('patient_user', 'patients.id', '=', 'patient_user.patient_id')->select('patient_user.dateIdentifier', 'patient_user.hour', 'patient_user.medicalAppointment', 'patients.ci', 'patients.name', 'patients.surname', 'patients.occupation', 'patients.age', 'patients.gender', 'patients.phone')->where('patient_user.user_id', $request->idSpecialist)->groupBy('patient_user.hour', 'patient_user.medicalAppointment', 'patient_user.dateIdentifier', 'patient_user.patient_id')->get(); //Obtiene todo los pacientes que agendan citas (fechas-horarios)
        return response()->json([
            "patientAgendaOkList" => $completeCalendar
        ]);
    }
}
