<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Professor extends Model
{
    protected $table = 'users';

    protected $fillable = [
        'name', 'email', 'phone', 'type', 'status', 'login', 'password'
    ];

    // Relacionamento com a tabela Schedule
    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'user_id');
    }
}
