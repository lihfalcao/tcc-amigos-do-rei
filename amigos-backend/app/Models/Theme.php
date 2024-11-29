<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{
    protected $table = 'themes'; 
    
    protected $fillable = [
        'name', 'content', 'resume'
    ];

    // Relacionamento com a tabela Schedule
    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'theme_id');
    }
}
