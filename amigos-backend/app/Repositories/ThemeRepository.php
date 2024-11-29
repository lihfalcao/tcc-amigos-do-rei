<?php

namespace App\Repositories;

use App\Models\Schedule;
use App\Models\Theme;
use App\Models\User;

class ThemeRepository
{

    public function getThemes(){
        return Theme::select(['id', 'name'])->get();
    }

    public function getProfessorsByTheme($id){
        return Schedule::select(['users.name', 'users.id', 'classes.id as classId', 'classes.name as className', 'schedule.date', 'schedule.id as scheduleId' ])
                        ->join('classes', 'classes.id', 'class_id')
                        ->join('users', 'users.id', '=', 'user_id')
                        ->where('theme_id', '=', $id)
                        ->orderBy('class_id')
                        ->get();
    }

}
