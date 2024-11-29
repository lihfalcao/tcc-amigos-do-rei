<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use App\Models\Theme;
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

    public function schedules(){
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            Log::info('Usuário não autenticado pelo guard Sanctum');
            return response()->json(['message' => 'Usuário não autenticado'], 401);
        }

        Log::info('Usuário autenticado', ['user' => $user]);
        return response()->json(['schedules' => $this->scheduleRepository->schedules()]);
    }

    public function getProfessors(){
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            Log::info('Usuário não autenticado pelo guard Sanctum');
            return response()->json(['message' => 'Usuário não autenticado'], 401);
        }

        Log::info('Usuário autenticado', ['user' => $user]);
        return response()->json(['professors' => $this->scheduleRepository->getProfessors()]);
    }

    public function getClasses(){
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            Log::info('Usuário não autenticado pelo guard Sanctum');
            return response()->json(['message' => 'Usuário não autenticado'], 401);
        }

        Log::info('Usuário autenticado', ['user' => $user]);
        return response()->json(['classes' => $this->scheduleRepository->getClasses()]);
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
        return response()->json(['schedules' => $this->scheduleRepository->getFutureSchedulesForProfessor($user->id, $startDate)]);
    }

    
    public function getPassedSchedules($professorId)
    {
        $endDate = now(); 
        $schedules = $this->scheduleRepository->getPassedSchedulesForProfessor($professorId, $endDate);

        return response()->json($schedules);
    }

    
    public function saveSchedule(Request $request)
    {
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            Log::info('Usuário não autenticado pelo guard Sanctum');
            return response()->json(['message' => 'Usuário não autenticado'], 401);
        }

        Log::info('Usuário autenticado', ['user' => $user]);

        $response = $request->all(); 
        $schedule = $this->scheduleRepository->saveSchedule($response);

        return response()->json($schedule, 201); 
    }

    public function updateSchedule(Theme $theme, Request $request)
    {
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            Log::info('Usuário não autenticado pelo guard Sanctum');
            return response()->json(['message' => 'Usuário não autenticado'], 401);
        }

        Log::info('Usuário autenticado', ['user' => $user]);

        $themeData = $request->all();
        $theme = $this->scheduleRepository->updateScheduleByTheme($theme->id, $themeData);

        return response()->json($theme, 201); 
    }

    public function deleteSchedule(Theme $theme)
    {
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            Log::info('Usuário não autenticado pelo guard Sanctum');
            return response()->json(['message' => 'Usuário não autenticado'], 401);
        }

        Log::info('Usuário autenticado', ['user' => $user]);

        Schedule::where('theme_id', $theme->id)->delete();
        Theme::where('id', $theme->id)->delete();

        return response()->json('true', 201); 
    }
}
