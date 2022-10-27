<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link href="{{ asset('css/forgotResetPassword.css') }}" rel="stylesheet">
</head>
<body>
    <div class="tarjet_container">
        
        <form method="POST" class="claseFormulario" action="{{ route('password.update') }}" >
        @csrf
        
        <div class="intento">

            <div class="fila_input">
                <label class="etiquetaresetpassword" for="correo" >Correo:</label>
                <input id="correo" class="inputFormresetPassword" placeholder="Ingrese su correo" type="email"  name="email" >
            </div>

            <div class="fila_input">
                <label class="etiquetaresetpassword" for="passowrd" >Nueva contraseña:</label>
                <input id="passowrd" class="inputFormresetPassword" placeholder="************" type="password"  name="password" >
            </div>

            <div class="fila_input">
                <label class="etiquetaresetpassword" for="password_confirmation" >Confirmar contraseña:</label>
                <input id="password_confirmation" class="inputFormresetPassword" placeholder="************" type="password"  name="password_confirmation" >
            </div>

            <input type="hidden"  name="token" @isset($token) value="{{$token}}" @endisset >
            <div class="fila_submit">
                <button type="submit" class="btn-primary_reset">
                    Actualizar
                </button>
            </div>
        </div>
        </form>

        @isset($msg)
        <div class="tarjet_message">
            <p>{{$msg}}</p>    
        </div> 
        @endisset   

    </div>
        </body>
        </html>