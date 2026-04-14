<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\FootballMatch;
use App\Models\TicketType;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

final class AdminController extends Controller
{
    /**
     * Obtener estadísticas consolidadas reales para los informes.
     */
    public function getStats(): JsonResponse
    {
        // Totales base
        $totalRevenue = Order::sum('total_price') ?? 0;
        
        // Ventas consolidadas contando tamaño del array 'seats' simulado por el total tickets
        // En Laravel no tenemos "quantity" directo en la tabla orders, así que nos basamos en total_price y price, o contable.
        // Pero para la demo general, Order::count() es suficiente para compras. Y sumamos todos los tickets si calculamos.
        $confirmedPurchases = Order::count();

        // 3.2.3 Informes: Recaptació per tipus d’entrada
        $revenueByCategory = DB::table('orders')
            ->join('ticket_types', 'orders.ticket_type_id', '=', 'ticket_types.id')
            ->select('ticket_types.zone', DB::raw('SUM(orders.total_price) as total'))
            ->groupBy('ticket_types.zone')
            ->get();

        // Evolución temporal de ventas (últimos 7 días)
        $evolution = Order::select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(total_price) as total_revenue'))
            ->groupBy('date')
            ->orderBy('date', 'ASC')
            ->limit(7)
            ->get();

        // Calcular Ocupación (total asientos iniciales vs restantes globales - simplificado globalmente)
        $totalSoldTicketsRaw = DB::table('orders')
            ->join('ticket_types', 'orders.ticket_type_id', '=', 'ticket_types.id')
            ->select(DB::raw('SUM(orders.total_price / ticket_types.price) as sold_seats'))
            ->value('sold_seats') ?? 0;
            
        $totalRemaining = TicketType::sum('remaining') ?? 1000;
        $totalInitial = $totalSoldTicketsRaw + $totalRemaining; 
        
        $occupancyPercentage = 0;
        if ($totalInitial > 0) {
            $occupancyPercentage = round(($totalSoldTicketsRaw / $totalInitial) * 100);
        }

        return response()->json([
            'total_revenue' => $totalRevenue,
            'confirmed_purchases' => $confirmedPurchases,
            'revenue_by_category' => $revenueByCategory,
            'evolution' => $evolution,
            'occupancy_percentage' => $occupancyPercentage,
            'sold_seats' => $totalSoldTicketsRaw,
            'available_seats' => $totalRemaining
        ]);
    }

    /**
     * 3.2.1 Gestió de l'esdeveniment: Crear y editar
     */
    public function storeMatch(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'name' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|string',
            'capacity' => 'required|integer',
            'categories' => 'array'
        ]);

        $dateTime = $payload['date'] . ' ' . $payload['time'] . ':00';
        // Generar un ID entero aleatorio que no colisione con TheSportsDB (que usan ~1M)
        $matchId = rand(9000000, 9999999);
        
        $teams = explode(' vs ', $payload['name']);
        
        // Crear evento
        FootballMatch::insert([
            'id' => $matchId,
            'home_team' => $teams[0] ?? 'L',
            'away_team' => $teams[1] ?? 'V',
            'stadium' => 'Estadi Personalitzat',
            'date' => $dateTime,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Guardar categorías de precios
        if (!empty($payload['categories'])) {
            $ticketsToInsert = [];
            foreach ($payload['categories'] as $cat) {
                if(isset($cat['name']) && isset($cat['price'])) {
                   // Aforamiento dinámico dividiendo equitativamente (demo)
                   $quantity = floor($payload['capacity'] / count($payload['categories']));
                   $ticketsToInsert[] = [
                       'match_id' => $matchId,
                       'zone' => $cat['name'],
                       'price' => (float) $cat['price'],
                       'remaining' => $quantity,
                       'created_at' => now(),
                       'updated_at' => now(),
                   ];
                }
            }
            if(count($ticketsToInsert) > 0) {
                TicketType::insert($ticketsToInsert);
            }
        }

        return response()->json([
            'message' => 'Esdeveniment guardat correctament real!',
            'match_id' => $matchId
        ], 201);
    }
}
