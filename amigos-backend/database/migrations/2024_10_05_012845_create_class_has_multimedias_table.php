<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClassHasMultimediasTable extends Migration
{
    public function up()
    {
        Schema::create('class_has_multimedias', function (Blueprint $table) {
            $table->unsignedBigInteger('class_id');
            $table->unsignedBigInteger('multimedia_id');
            $table->timestamps();
            $table->softDeletes();

            // Foreign keys
            $table->foreign('class_id')->references('id')->on('classes')->onDelete('cascade');
            $table->foreign('multimedia_id')->references('id')->on('multimedias')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('class_has_multimedias');
    }
}
