<?php
declare(strict_types=1);
namespace App\Http\Controllers;
use App\Models\TicketType;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
final class TicketController extends Controller
{
    /**
     * Reservar entrada
     */
    public function reserve(Request $request): JsonResponse
    {
        // 1. Validar la petición
        $request->validate([
            'ticket_type_id' => ['required', 'integer', 'exists:ticket_types,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);
        $ticketTypeId = (int) $request->input('ticket_type_id');
        $quantity = (int) $request->input('quantity');
        // 2. Transacción + Bloqueo para evitar Race Conditions
        return DB::transaction(function () use ($ticketTypeId, $quantity) {
            
            // lockForUpdate() bloquea la fila hasta que acabe la transacción. 
            // Evita que 2 personas compren la última entrada al mismo tiempo.
            $ticketType = TicketType::lockForUpdate()->find($ticketTypeId);
            // 3. Comprobar disponibilidad
            if ($ticketType->remaining < $quantity) {
                return response()->json([
                    'message' => 'Error: No hay suficientes entradas disponibles.',
                    'remaining' => $ticketType->remaining,
                ], 400); // 400 Bad Request
            }
            // 4. Restar entradas y guardar
            $ticketType->remaining -= $quantity;
            $ticketType->save();
            // 5. Devolver éxito
            return response()->json([
                'message' => 'Reserva realizada correctamente'
            ], 200);
        });
    }
}