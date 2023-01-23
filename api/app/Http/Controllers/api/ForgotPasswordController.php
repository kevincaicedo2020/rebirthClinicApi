<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Mail\ResetPassword;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class ForgotPasswordController extends Controller
{
    public function forgotPassword(Request $request)
    {
        $validator = $request->validate([
            'email' => 'required|email'
        ]);

        if (User::where('email', $request->email)->first()) {
            $user = User::where('email', $request->email)->first();
        } else {
            $user = Patient::where('email', $request->email)->first();
        }

        if ($user) {

            if ($user->rol_id === 2) {
                $status = Password::sendResetLink(
                    $request->only('email')
                );
            } elseif ($user->rol_id === 1) {
                $status = Password::broker('pantients')->sendResetLink(
                    $request->only('email')
                );
            }
            if ($status) {
                /* $token = DB::table('password_resets')->select('token')->where('email', $request->email)->get(); */
                /* Mail::to($request->email)->send(new ResetPassword($token)); */
                return response()->json([
                    'status' => 1,
                    'msg' => 'Correo enviado con éxito'
                ]);
            }
            return response()->json([
                'status' => 1,
                'msg' => 'Intentelo de nuevo'
            ]);
        } else {
            return response()->json([
                'status' => 0,
                'msg' => 'Usuario no existente'
            ]);
        }
    }

    public function SendTokenPassword($token)
    {
        return view('email.formEmailResetPassword', ['token' => $token]);
    }

    public function UpdateResetPassword(Request $request)
    {
        $validator = $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed'
        ]);

        if (!$validator) {
            return view('email.formEmailResetPassword', ['msg' => 'Intentelo de nuevo']);
        }

        if (User::where('email', $request->email)->first()) {
            $user = User::where('email', $request->email)->first();
        } else {
            $user = Patient::where('email', $request->email)->first();
        }

        if ($user) {
            $verify = DB::table('password_resets')->select('token')->where('email', $request->email)->get();
            foreach ($verify as $key => $value) {
                $tokenValue = $value->token;
            }
            $verifyEmailEqual = Hash::check($request->token, $tokenValue);

            if ($verifyEmailEqual) {

                if ($user->rol_id === 2) {

                    $status = Password::reset(
                        $request->only('email', 'password', 'password_confirmation', 'token'),
                        function ($user, $password) {
                            $user->forceFill([
                                'password' => Hash::make($password)
                            ])->setRememberToken(Str::random(60));

                            $user->save();

                            event(new PasswordReset($user));
                        }
                    );
                } elseif ($user->rol_id === 1) {

                    $status = Password::broker('pantients')->reset(
                        $request->only('email', 'password', 'password_confirmation', 'token'),
                        function ($user, $password) {
                            $user->forceFill([
                                'password' => Hash::make($password)
                            ])->setRememberToken(Str::random(60));

                            $user->save();

                            event(new PasswordReset($user));
                        }
                    );
                }

                if ($status) {
                    return view('email.formEmailResetPassword', ['msg' => 'Contraseña actualizada']);
                } else {
                    return view('email.formEmailResetPassword', ['msg' => 'Ocurrio un error']);
                }
            }
        } else {
            return view('email.formEmailResetPassword', ['msg' => 'Verifica que todo esté bien']);
        }
    }
}
