<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Rotas protegidas por CSRF e autenticação Sanctum
Route::middleware(['auth:sanctum'])->group(function () {
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
    Route::post('/logout', [UserController::class, 'logout']);
});

// Rotas públicas
Route::post('/login', [UserController::class, 'login']);
Route::post('/users', [UserController::class, 'store']);
