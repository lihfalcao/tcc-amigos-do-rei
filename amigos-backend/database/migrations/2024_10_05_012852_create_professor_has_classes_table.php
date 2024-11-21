<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfessorHasClassesTable extends Migration
{
    public function up()
    {
        Schema::create('professor_has_classes', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id'); // Professor
            $table->unsignedBigInteger('class_id');

            // Foreign keys
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('class_id')->references('id')->on('classes')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('professor_has_classes');
    }
}

