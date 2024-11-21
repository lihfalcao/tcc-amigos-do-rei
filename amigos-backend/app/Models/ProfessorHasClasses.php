<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfessorHasClasses extends Model
{
    protected $table = 'professor_has_classes';

    protected $fillable = [
        'user_id', 'class_id'
    ];

    public function class()
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }

    public function professor()
    {
        return $this->belongsTo(Professor::class, 'user_id');
    }
}
