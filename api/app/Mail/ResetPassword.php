<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

/* use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Content; */

class ResetPassword extends Mailable
{
    use Queueable, SerializesModels;
    protected $token;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($pin)
    {
        foreach ($pin as $key => $value) {
            $token = $value->token;
        }
        
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Restablecer contraseña')->with([
            'token' => $this->token
        ])->markdown('email.testEmail');
    }
}
