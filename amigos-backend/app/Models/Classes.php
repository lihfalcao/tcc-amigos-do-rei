<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classes extends Model
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

    public function professorHasClasses()
    {
        return $this->hasMany(ProfessorHasClasses::class, 'class_id');
    }
}
