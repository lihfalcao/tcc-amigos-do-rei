<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateThemeHasMultimediaTable extends Migration
{
    public function up()
    {
        Schema::create('theme_has_multimedia', function (Blueprint $table) {
            $table->unsignedBigInteger('theme_id');
            $table->unsignedBigInteger('multimedia_id');
            $table->timestamps();
            $table->softDeletes();

            // Foreign keys
            $table->foreign('theme_id')->references('id')->on('themes')->onDelete('cascade');
            $table->foreign('multimedia_id')->references('id')->on('multimedias')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('theme_has_multimedia');
    }
}
