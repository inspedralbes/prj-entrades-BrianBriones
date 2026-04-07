<?php
declare(strict_types=1);
namespace App\Http\Controllers;
use App\Models\TicketType;
use App\Models\FootballMatch;
use App\Http\Requests\ReserveTicketRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Exception;

final class TicketController extends Controller
{
    /**
     * Reservar entrada de forma concurrente y segura
     */
    public function reserve(ReserveTicketRequest $request): JsonResponse
    {
        // 1. Los datos ya vienen validados por el ReserveTicketRequest
        $ticketTypeId = (int) $request->validated('ticket_type_id');
        $quantity     = (int) $request->validated('quantity');

        try {
            // 2. Transacción + Bloqueo de concurrencia
            return DB::transaction(function () use ($ticketTypeId, $quantity) {
                
                // lockForUpdate() bloquea la fila específica en la BD hasta el fin de transacción
                // Nadie más puede leer ni editar este ticketType al mismo tiempo
                $ticketType = TicketType::lockForUpdate()->find($ticketTypeId);

                // 3. Comprobar disponibilidad de forma segura
                if ($ticketType->remaining < $quantity) {
                    return response()->json([
                        'error' => 'No hay suficientes entradas disponibles.',
                        'remaining' => $ticketType->remaining,
                    ], 409); // 409 Conflict: Problema con el estado actual
                }

                // 4. Restar cantidad y guardar
                $ticketType->remaining -= $quantity;
                $ticketType->save();

                // 5. Devolver éxito
                return response()->json([
                    'message' => 'Reserva realizada correctamente',
                    'remaining' => $ticketType->remaining,
                ], 200);
            });
        } catch (Exception $e) {
            // Fallback por si la base de datos se cae o la transacción falla
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
        $tickets = TicketType::where('match_id', $matchId)->get();

        if ($tickets->isEmpty()) {
            // Si Laravel no conoce el partido externo, lo creamos dinámicamente:
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

            // Semilla dinámica de entradas
            TicketType::insert([
                ['match_id' => $matchId, 'zone' => 'General', 'price' => 50.00, 'remaining' => 100, 'created_at' => now(), 'updated_at' => now()],
                ['match_id' => $matchId, 'zone' => 'VIP', 'price' => 120.00, 'remaining' => 20, 'created_at' => now(), 'updated_at' => now()],
                ['match_id' => $matchId, 'zone' => 'Tribuna', 'price' => 80.00, 'remaining' => 50, 'created_at' => now(), 'updated_at' => now()],
            ]);
            
            $tickets = TicketType::where('match_id', $matchId)->get();
        }

        return response()->json($tickets);
    }
}