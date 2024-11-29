<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use Illuminate\Http\Request;
use App\Repositories\ThemeRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ThemeController extends Controller
{
    protected $themeRepository;

    public function __construct(ThemeRepository $themeRepository)
    {
        $this->themeRepository = $themeRepository;
    }

    
    public function getTheme(Theme $theme)
    {
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            Log::info('Usuário não autenticado pelo guard Sanctum');
            return response()->json(['message' => 'Usuário não autenticado'], 401);
        }

        Log::info('Usuário autenticado', ['user' => $user]);

        $professors = $this->themeRepository->getProfessorsByTheme($theme->id);
        $theme->professors = $professors;
        $date = new \DateTime($professors[0]->date);
        $theme->date_f = $date->format('d/m/Y');
        return response()->json($theme);
    }

    public function getThemes(){
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            Log::info('Usuário não autenticado pelo guard Sanctum');
            return response()->json(['message' => 'Usuário não autenticado'], 401);
        }

        Log::info('Usuário autenticado', ['user' => $user]);
        return response()->json(['themes' => $this->themeRepository->getThemes()]);
    }

    public function saveTheme (Request $request){
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            Log::info('Usuário não autenticado pelo guard Sanctum');
            return response()->json(['message' => 'Usuário não autenticado'], 401);
        }

        Log::info('Usuário autenticado', ['user' => $user]);

        $response = $request->all();
        $data = [
            'name' => $response['themeName'],
            'content' => $response['content'],
            'resume' => $response['resume'],
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ];

        $theme = Theme::create($data);

        return response()->json(['id' => $theme->id]);
    }

}
