<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $table = 'schedule'; 

    protected $fillable = [
        'date', 'user_id', 'class_id', 'theme_id', 'type'
    ];

    
    public function professor()
    {
        return $this->belongsTo(Professor::class, 'user_id');
    }


    public function class()
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }


    public function theme()
    {
        return $this->belongsTo(Theme::class, 'theme_id');
    }
}
