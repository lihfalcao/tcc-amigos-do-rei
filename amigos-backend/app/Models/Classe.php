<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    protected $table = 'classes'; 

    protected $fillable = [
        'name', 'start_age', 'end_age', 'color'
    ];

    // Relacionamento com a tabela Schedule
    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'class_id');
    }
}