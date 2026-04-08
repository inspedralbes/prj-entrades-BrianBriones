<?php
declare(strict_types=1);
namespace App\Http\Controllers;
use App\Models\TicketType;
use App\Models\FootballMatch;
use App\Models\TicketHold;
use Illuminate\Http\Request;
use App\Http\Requests\ReserveTicketRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Str;

final class TicketController extends Controller
{
    /**
     * Crear retención (HOLD) de entradas
     */
    public function hold(Request $request): JsonResponse
    {
        $request->validate([
            'ticket_type_id' => 'required|exists:ticket_types,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $ticketTypeId = (int) $request->input('ticket_type_id');
        $quantity     = (int) $request->input('quantity');

        // Eliminar holds caducados
        TicketHold::where('expires_at', '<', now())->delete();

        $ticketType = TicketType::find($ticketTypeId);
        
        $activeHoldsCount = TicketHold::where('ticket_type_id', $ticketTypeId)->sum('quantity');
        
        $available = max(0, $ticketType->remaining - $activeHoldsCount);

        if ($available < $quantity) {
            return response()->json(['error' => 'No hay entradas suficientes disponibles.'], 409);
        }

        $holdId = 'hold_' . Str::random(10);
        $expiresAt = now()->addMinutes(5);

        TicketHold::create([
            'hold_id' => $holdId,
            'ticket_type_id' => $ticketTypeId,
            'quantity' => $quantity,
            'expires_at' => $expiresAt,
        ]);

        return response()->json([
            'holdId' => $holdId,
            'expiresAt' => $expiresAt->timestamp * 1000,
        ]);
    }

    /**
     * Reservar entrada de forma concurrente y segura
     */
    public function reserve(ReserveTicketRequest $request): JsonResponse
    {
        $ticketTypeId = (int) $request->validated('ticket_type_id');
        $quantity     = (int) $request->validated('quantity');
        $holdId       = $request->input('holdId');

        try {
            return DB::transaction(function () use ($ticketTypeId, $quantity, $holdId) {
                
                TicketHold::where('expires_at', '<', now())->delete();

                $ticketType = TicketType::lockForUpdate()->find($ticketTypeId);

                if ($holdId) {
                    $hold = TicketHold::where('hold_id', $holdId)->lockForUpdate()->first();
                    if (!$hold) {
                        return response()->json(['error' => 'Tu reserva temporal ha expirado.'], 409);
                    }
                    if ($hold->quantity != $quantity || $hold->ticket_type_id != $ticketTypeId) {
                        return response()->json(['error' => 'Parámetros de reserva no coinciden con la retención.'], 400);
                    }
                } else {
                    $activeHoldsCount = TicketHold::where('ticket_type_id', $ticketTypeId)->sum('quantity');
                    $available = max(0, $ticketType->remaining - $activeHoldsCount);
                    if ($available < $quantity) {
                        return response()->json(['error' => 'No hay entradas suficientes disponibles.'], 409);
                    }
                }

                if ($ticketType->remaining < $quantity) {
                    return response()->json([
                        'error' => 'No hay suficientes entradas disponibles.',
                        'remaining' => clone $ticketType->remaining,
                    ], 409);
                }

                $ticketType->remaining -= $quantity;
                $ticketType->save();

                if (isset($hold)) {
                    $hold->delete();
                }

                return response()->json([
                    'message' => 'Reserva realizada correctamente',
                    'remaining' => $ticketType->remaining,
                ], 200);
            });
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Ocurrió un error al procesar la reserva. Inténtalo de nuevo.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener los tickets mediante Match ID dinámico
     */
    public function getByMatch(string $matchId): JsonResponse
    {
        // Limpiamos holds caducados (mantenimiento pasivo)
        TicketHold::where('expires_at', '<', now())->delete();

        $tickets = TicketType::where('match_id', $matchId)->get();

        if ($tickets->isEmpty()) {
            if (!FootballMatch::where('id', $matchId)->exists()) {
                FootballMatch::insert([
                    'id' => $matchId,
                    'home_team' => 'External Home',
                    'away_team' => 'External Away',
                    'stadium' => 'External Stadium',
                    'date' => now(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            TicketType::insert([
                ['match_id' => $matchId, 'zone' => 'General', 'price' => 50.00, 'remaining' => 100, 'created_at' => now(), 'updated_at' => now()],
                ['match_id' => $matchId, 'zone' => 'VIP', 'price' => 120.00, 'remaining' => 20, 'created_at' => now(), 'updated_at' => now()],
                ['match_id' => $matchId, 'zone' => 'Tribuna', 'price' => 80.00, 'remaining' => 50, 'created_at' => now(), 'updated_at' => now()],
            ]);
            
            $tickets = TicketType::where('match_id', $matchId)->get();
        }

        $tickets->transform(function ($ticket) {
            $holdsCount = TicketHold::where('ticket_type_id', $ticket->id)->sum('quantity');
            $ticket->available = max(0, $ticket->remaining - $holdsCount);
            return $ticket;
        });

        return response()->json($tickets);
    }
}