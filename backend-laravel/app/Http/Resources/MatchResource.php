<?php
declare(strict_types=1);
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
final class MatchResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'home_team' => $this->home_team,
            'away_team' => $this->away_team,
            'stadium' => $this->stadium,
            'date' => $this->date?->toIso8601String(),
            // Incluye los tickets SOLO si se especifica la relación (evita consultas N+1)
            'tickets' => TicketTypeResource::collection($this->whenLoaded('ticketTypes')),
        ];
    }
}