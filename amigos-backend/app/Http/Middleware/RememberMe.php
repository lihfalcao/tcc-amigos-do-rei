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
        if (Auth::guard('sanctum')->check()) {
            return $next($request);
        }

        $rememberToken = $request->cookie('remember_token');
        \Log::info('Remember token from cookie:', ['token' => $rememberToken]); // Log do cookie

        if ($rememberToken) {
            $user = User::where('remember_token', $rememberToken)->first();

            if ($user) {
                Auth::login($user);
                \Log::info('User logged in:', ['user_id' => $user->id]);
                return $next($request);
            } else {
                \Log::warning('Invalid remember token');
                return response()->json(['message' => 'Unauthorized'], 401);
            }
        }

        return $next($request);
    }

}
