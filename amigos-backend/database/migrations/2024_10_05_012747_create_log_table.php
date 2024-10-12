<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLogTable extends Migration
{
    public function up()
    {
        Schema::create('log', function (Blueprint $table) {
            $table->id();
            $table->string('description', 50);
            $table->string('action', 50);
            $table->string('model', 50);
            $table->unsignedBigInteger('model_id');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();
            $table->softDeletes();

            // Foreign key
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('log');
    }
}

