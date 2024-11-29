<?php

namespace App\Repositories;

use App\Models\Classes;
use App\Models\Professor;
use App\Models\Schedule;
use App\Models\Theme;
use App\Models\User;
use DateTime;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Log;

class ScheduleRepository
{

    public function schedules(){
        return Schedule::with(['professor', 'class', 'theme']) 
                        ->get();
    }
    public function getSchedulesForProfessor($professorId)
    {
        return Schedule::select(['themes.name as theme', 'date', 'resume', 'content', 'classes.name as class', 'shift', 'themes.id as themeId'])
                        ->join('classes', 'classes.id', 'class_id')
                        ->join('themes', 'themes.id', 'theme_id')
                        ->where('user_id', $professorId)
                        ->where('type', 'event')
                        ->orderBy('date', 'desc')
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
                        ->with(['professor', 'class', 'theme']) 
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
        $date = \DateTime::createFromFormat('d/m/Y', $data['date']); 

        $schedule = [
            'date' => $date->format('Y-m-d'),
            'user_id' => $data['user_id'],
            'class_id' => $data['class_id'],
            'theme_id' => $data['theme_id'],
            'created_at' => new Date('Y-m-d H:i:s'),
            'type' => 'event',
        ];
        return Schedule::create($schedule);
    }

    public function getProfessors(){
        return Professor::select(['id', 'name'])->get();
    }

    public function getClasses(){
        return Classes::select(['id', 'name'])->get();
    }

    public function updateScheduleByTheme($themeId, $data){
        $ids = [];
        foreach($data['professors'] as $professor){
            if(!empty($professor['schedule'])){
                $schedule = Schedule::find($professor['schedule']);
                $date = \DateTime::createFromFormat('d/m/Y', $data['date']); 
                if ($schedule) {
                    $schedule->update([
                        'theme_id' => $data['themeId'],
                        'date' => $date->format('Y-m-d'),
                        'user_id' => $professor['professor'],
                        'class_id' => $professor['class']
                    ]);

                    $ids[] = $professor['schedule'];
                } else {
                    Log::warning("Evento com ID {$professor['schedule']} não encontrado.");
                }
            } else {
                $date = \DateTime::createFromFormat('d/m/Y', $data['date']); 
                $schedule = Schedule::create([
                    'type' => 'event',
                    'theme_id' => $data['themeId'],
                    'date' => $date->format('Y-m-d'),
                    'user_id' => $professor['professor'],
                    'class_id' => $professor['class'],
                    'created_at' => new Date('Y-m-d H:i:s'),
                    'updated_at' => new Date('Y-m-d H:i:s'),    
                ]);

                $ids[] = $schedule['id'];
            }
        }

        Schedule::whereNotIn('id', $ids)->where('theme_id', $data['themeId'])->delete();

        return true;
    }
}
