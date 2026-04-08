<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MatchController;
use App\Http\Controllers\TicketController;
// Quitar en caso de que devuelva el "data" por defecto de los JsonResource 
// (Lo pongo aquí por si prefieres no devolver la llave envolvente 'data' de Laravel)
use Illuminate\Http\Resources\Json\JsonResource;
JsonResource::withoutWrapping(); 
// Endpoints

Route::get('/matches/{id}', [MatchController::class, 'show']);
Route::post('/tickets/hold', [TicketController::class, 'hold']);
Route::post('/tickets/reserve', [TicketController::class, 'reserve']);
use App\Http\Controllers\AuthController;

Route::get('/auth/google',          [AuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/me',           [AuthController::class, 'me']);
});
Route::get('/tickets/match/{match_id}', [TicketController::class, 'getByMatch']);
Route::get('/matches', [MatchController::class, 'index']);