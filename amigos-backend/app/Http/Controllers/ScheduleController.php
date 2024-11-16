<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\ScheduleRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ScheduleController extends Controller
{
    protected $scheduleRepository;

    public function __construct(ScheduleRepository $scheduleRepository)
    {
        $this->scheduleRepository = $scheduleRepository;
    }

    
    public function getSchedulesForLoggedInUser()
    {
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            Log::info('Usuário não autenticado pelo guard Sanctum');
            return response()->json(['message' => 'Usuário não autenticado'], 401);
        }

        Log::info('Usuário autenticado', ['user' => $user]);
        return response()->json(['schedules' => $this->scheduleRepository->getSchedulesForLoggedInUser($user)]);
    }

    public function getFutureSchedulesForProfessor()
    {
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            Log::info('Usuário não autenticado pelo guard Sanctum');
            return response()->json(['message' => 'Usuário não autenticado'], 401);
        }

        $startDate = now(); 

        Log::info('Usuário autenticado', ['user' => $user]);
        return response()->json(['schedules' => $this->scheduleRepository->getPassedSchedulesForProfessor($user->id, $startDate)]);
    }

    
    public function getPassedSchedules($professorId)
    {
        $endDate = now(); 
        $schedules = $this->scheduleRepository->getPassedSchedulesForProfessor($professorId, $endDate);

        return response()->json($schedules);
    }

    
    public function saveSchedule(Request $request)
    {
        $scheduleData = $request->all();
        $schedule = $this->scheduleRepository->saveSchedule($scheduleData);

        return response()->json($schedule, 201); 
    }
}
