<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MatchController;
use App\Http\Controllers\TicketController;
// Quitar en caso de que devuelva el "data" por defecto de los JsonResource 
// (Lo pongo aquí por si prefieres no devolver la llave envolvente 'data' de Laravel)
use Illuminate\Http\Resources\Json\JsonResource;
JsonResource::withoutWrapping(); 
// Endpoints
Route::get('/matches', [MatchController::class, 'index']);
Route::get('/matches/{id}', [MatchController::class, 'show']);
Route::post('/tickets/reserve', [TicketController::class, 'reserve']);