<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patient_user', function (Blueprint $table) {
            $table->id();
            $table->double('dateIdentifier', 1);
            $table->date('medicalAppointment');
            $table->time('hour');
            $table->foreignId('patient_id')->constrained('patients');
            $table->foreignId('user_id')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patient_user');
    }
};
