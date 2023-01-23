<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\crud\UpdateUserPatientRequest;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class PatientController extends Controller
{

    public function updatePatient(UpdateUserPatientRequest $request)
    {
        $request->validated();

        $user = Patient::find($request->id);
        $user->ci = $request->ci;
        $user->name = $request->name;
        $user->surname = $request->surname;
        $user->occupation = $request->occupation;
        $user->email = $request->email;
        $user->age = $request->age;
        $user->gender = $request->gender;
        $user->phone = $request->phone;
        $user->save();


        return response()->json([
            'status' => 1,
            'msg' => 'Registro realizado con exito',
            'data' => $user
        ]);
    }


    public function postImage(Request $request)
    {
        /* $this->validate($request, [
            'image' => 'required',
        ]); */
        /* $image_path = $request->file('image')->store('image'); */

        /* $data = Patient::create([
            'image_url' => $image_path
        ]); */
        echo 'hola kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk';
        echo $request;
        /* $data = DB::insert('insert into patients (image_url) values (?)', [$image_path]); */

        return response()->json([
            "image" => $request,
            /* "data" => $image_path */
        ]);
        /* return response($data, Response::HTTP_CREATED); */
    }
}
