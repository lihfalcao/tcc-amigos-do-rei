<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScheduleHasPhotoTable extends Migration
{
    public function up()
    {
        Schema::create('schedule_has_photo', function (Blueprint $table) {
            $table->unsignedBigInteger('class_id');
            $table->string('photo', 50);
            $table->timestamps();
            $table->softDeletes();

            // Foreign keys
            $table->foreign('class_id')->references('id')->on('classes')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('schedule_has_photo');
    }
}

