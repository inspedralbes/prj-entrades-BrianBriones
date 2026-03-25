<?php
declare(strict_types=1);
namespace App\Http\Controllers;
use App\Models\FootballMatch;
use App\Http\Resources\MatchResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
final class MatchController extends Controller
{
    /**
     * Obtener todos los partidos
     */
    public function index(): AnonymousResourceCollection
    {
        $matches = FootballMatch::orderBy('date', 'asc')->get();
        return MatchResource::collection($matches);
    }
    /**
     * Obtener detalle de un partido con sus entradas
     */
    public function show(int $id): MatchResource
    {
        // Usamos eager loading para traer los tickets y evitar probema N+1
        $match = FootballMatch::with('ticketTypes')->findOrFail($id);
        return new MatchResource($match);
    }
}