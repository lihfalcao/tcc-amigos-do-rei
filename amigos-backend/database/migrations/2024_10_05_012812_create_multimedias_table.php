<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMultimediasTable extends Migration
{
    public function up()
    {
        Schema::create('multimedias', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('url', 50);
            $table->enum('type', ['video', 'image']);
            $table->unsignedBigInteger('user_id');
            $table->timestamps();
            $table->softDeletes();

            // Foreign key
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('multimedias');
    }
}
