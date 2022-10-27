
 
    

@component('mail::message')
# Recuperación de la cuenta
 
De click en el boton e ingrese su nueva contraseña!
 
@component('mail::button', ['url' =>  'http://127.0.0.1:8080/api/email/'.$token])
Restablecer contraseña
@endcomponent
Este enlace solo es válido dentro de los proximos 60 minutos.<br>
Si no has solicitado un cambio de contraseña, puedes ignorar o eliminar este e-mail.<br>
Saludos.

@endcomponent



{{-- 
<body>
    <div style="max-width: 50%; margin: 0 auto;">
    <h1 style="margin-bottom: 5px; font-size: 20px;">Cambia o restablece tu contraseña</h1>
    <p style="font-size: 15px; width: 345px;">Ingrese el correo o gmail que tiene en la aplicación y proporcione una nueva contraseña{{$user}}</p>
    <form action="{{route('prueba')}}" method="get">
        @csrf
        <div>
            <label for="email">Correo:</label><br>
            <input type="email" style="min-width: 230px; margin-bottom: 10px; padding: 5px; border-radius: 5px; border-width: 1px; border-width: 1px; background: #fff; color: #000;" name="email" placeholder="Ingrese el correo" id="email">
        </div>
        <div>
            <label for="password">Cambiar contraseña:</label><br>
            <input type="password" style="min-width: 230px; margin-bottom: 10px; padding: 5px; border-radius: 5px; border-width: 1px;border-width: 1px; border-width: 1px; background: #fff; color: #000;" name="password" placeholder="******************" id="password"><br>
            <input type="password" style="min-width: 230px; padding: 5px; border-radius: 5px; border-width: 1px; border-width: 1px; border-width: 1px; background: #fff; color: #000;" name="password_confirm" placeholder="******************">
        </div>
        <input type="submit" style="background-color: #4796d6; color: #fff; margin-top: 10px; padding: 11px 60px; border-style: none; min-width: 230px; border-radius: 5px;" value="Enviar">
    </form>
    </div>
    

    
</body>
 --}}