<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class RememberMe
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Tenta a autenticação padrão do Sanctum
        if (Auth::guard('sanctum')->check()) {
            return $next($request);
        }

        // Se a autenticação via Sanctum falhar, verifica o remember_token
        $rememberToken = $request->cookie('remember_token');

        if ($rememberToken) {
            // Verifique se o token existe e está associado a um usuário
            $user = User::where('remember_token', $rememberToken)->first();

            if ($user) {
                // O usuário está autenticado
                Auth::login($user);
                // Crie um token Sanctum se necessário
                $token = $user->createToken('YourAppName')->plainTextToken;
                // Adicione o token à resposta, se necessário
                return response()->json(['token' => $token], 200);
            } else {
                // Token inválido, remover cookie e redirecionar ou retornar erro
                return response()->json(['message' => 'Unauthorized'], 401);
            }
        }

        return $next($request);
    }
}
