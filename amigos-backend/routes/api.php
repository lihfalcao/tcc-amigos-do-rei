<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\ThemeController;
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
    Route::get('/user', [UserController::class, 'loggedUser']);
    Route::put('/user', [UserController::class, 'updateLoggedUser']);
    Route::post('/user/avatar', [UserController::class, 'uploadAvatar']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/theme/{theme}', [ThemeController::class, 'getTheme']);
    Route::get('/schedule', [ScheduleController::class, 'getSchedulesForLoggedInUser']);
    Route::get('/schedules', [ScheduleController::class, 'schedules']);
    Route::get('/schedule/future', [ScheduleController::class, 'getFutureSchedulesForProfessor']);
    Route::get('/schedule/passed/{professorId}', [ScheduleController::class, 'getPassedSchedules']);
    Route::post('/schedule', [ScheduleController::class, 'saveSchedule']);
    Route::get('/classes', [ScheduleController::class, 'getClasses']);
    Route::put('/class/{theme}', [ScheduleController::class, 'updateSchedule']);
    Route::delete('/class/{theme}', [ScheduleController::class, 'deleteSchedule']);
    Route::post('/class', [ThemeController::class, 'saveTheme']);
    Route::get('/professors', [ScheduleController::class, 'getProfessors']);
    Route::get('/themes', [ThemeController::class, 'getThemes']);
});

// Rotas públicas
Route::post('/login', [UserController::class, 'login']);
Route::post('/users', [UserController::class, 'store']);
