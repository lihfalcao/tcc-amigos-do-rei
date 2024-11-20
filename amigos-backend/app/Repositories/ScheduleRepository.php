<?php

namespace App\Repositories;

use App\Models\Schedule;
use App\Models\User;

class ScheduleRepository
{
    public function getSchedulesForProfessor($professorId)
    {
        return Schedule::select(['themes.name as theme', 'date', 'resume', 'content', 'classes.name as class', 'shift'])
                        ->join('classes', 'classes.id', 'class_id')
                        ->join('themes', 'themes.id', 'theme_id')
                        ->where('user_id', $professorId)
                        ->where('type', 'event')

                        ->get();
    }

    public function getSchedulesForLoggedInUser(User $user)
    {
        
        $professorId = $user->id;

        return $this->getSchedulesForProfessor($professorId);
    }

    public function getPassedSchedulesForProfessor($professorId, $endDate)
    {
        return Schedule::where('user_id', $professorId)
                        ->where('type', 'event')
                        ->where('date', '<', $endDate)
                        ->with(['professor', 'classe', 'theme']) 
                        ->get();
    }

    public function getFutureSchedulesForProfessor($professorId, $startDate)
    {
        return Schedule::select(['themes.name as theme', 'themes.id as themeId', 'date', 'resume', 'content', 'classes.name as class', 'shift'])
                        ->join('classes', 'classes.id', 'class_id')
                        ->join('themes', 'themes.id', 'theme_id')
                        ->where('user_id', $professorId)
                        ->where('type', 'event')
                        ->where('date', '>', $startDate)                        
                        ->get();
    }

    public function saveSchedule(array $data)
    {
        return Schedule::create($data);
    }
}
