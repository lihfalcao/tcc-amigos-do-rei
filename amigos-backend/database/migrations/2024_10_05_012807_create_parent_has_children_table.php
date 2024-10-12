<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateParentHasChildrenTable extends Migration
{
    public function up()
    {
        Schema::create('parent_has_children', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('children_id');
            $table->timestamps();
            $table->softDeletes();

            // Foreign keys
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('children_id')->references('id')->on('children')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('parent_has_children');
    }
}
