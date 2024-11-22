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
        return response()->json($theme);
    }

}
