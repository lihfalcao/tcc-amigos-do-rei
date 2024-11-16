<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateThemesTable extends Migration
{
    public function up()
    {
        Schema::create('themes', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->longText('content');
            $table->text('resume');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('themes');
    }
}
