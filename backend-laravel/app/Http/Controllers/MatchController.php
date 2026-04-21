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
        $match = FootballMatch::with('ticketTypes')->findOrFail($id);
        return new MatchResource($match);
    }

    /**
     * Sincronizar partidos desde TheSportsDB directamente y poblar DB (NUEVO)
     */
    public function fetchFromApi()
    {
        // 4335 = Spanish La Liga
        $responseNext = \Illuminate\Support\Facades\Http::get('https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=4335');
        $responsePast = \Illuminate\Support\Facades\Http::get('https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=4335');
        
        $events = array_merge(
             $responseNext->json('events') ?? [],
             $responsePast->json('events') ?? []
        );
        $added = 0;

        foreach ($events as $event) {
            $eventId = (int) $event['idEvent'];
            
            // Si el partido no existe, lo insertamos
            if (!FootballMatch::where('id', $eventId)->exists()) {
                $dateString = $event['dateEvent'] . ' ' . ($event['strTimeLocal'] ?: $event['strTime']);
                
                FootballMatch::insert([
                    'id' => $eventId,
                    'home_team' => $event['strHomeTeam'],
                    'away_team' => $event['strAwayTeam'],
                    'stadium' => $event['strVenue'] ?: 'Estadio por confirmar',
                    'date' => $dateString,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                
                // Generamos tickets base para este partido en nuestra DB
                \App\Models\TicketType::insert([
                    ['match_id' => $eventId, 'zone' => 'General', 'price' => 50.00, 'remaining' => 100, 'created_at' => now(), 'updated_at' => now()],
                    ['match_id' => $eventId, 'zone' => 'VIP', 'price' => 120.00, 'remaining' => 50, 'created_at' => now(), 'updated_at' => now()],
                    ['match_id' => $eventId, 'zone' => 'Tribuna', 'price' => 80.00, 'remaining' => 150, 'created_at' => now(), 'updated_at' => now()],
                ]);
                
                $added++;
            }
        }

        return response()->json([
            'message' => 'Sincronització amb TheSportsDB completada correctament.',
            'partits_nous' => $added
        ], 200);
    }
}