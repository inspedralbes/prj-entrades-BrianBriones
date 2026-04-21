<?php
declare(strict_types=1);
namespace Database\Seeders;
use App\Models\FootballMatch;
use App\Models\TicketType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Partido ejemplo
        $match = FootballMatch::create([
            'home_team' => 'FC Barcelona',
            'away_team' => 'Sevilla FC',
            'stadium'   => 'Spotify Camp Nou',
            'date'      => Carbon::now()->addDays(5)->setTime(21, 0),
        ]);
        // Entradas (3 tipos usando el ID generado)
        TicketType::create([
            'match_id'  => $match->id,
            'zone'      => 'Tribuna',
            'price'     => 120.00,
            'remaining' => 5,
        ]);
        TicketType::create([
            'match_id'  => $match->id,
            'zone'      => 'Lateral',
            'price'     => 80.00,
            'remaining' => 150,
        ]);
        TicketType::create([
            'match_id'  => $match->id,
            'zone'      => 'Gol',
            'price'     => 60.00,
            'remaining' => 300,
        ]);
    
        // Partido ejemplo
        $match = FootballMatch::create([
            'home_team' => 'Real Madrid',
            'away_team' => 'Atlético de Madrid',
            'stadium'   => 'Santiago Bernabéu',
            'date'      => Carbon::now()->addDays(5)->setTime(21, 0),
        ]);
        // Entradas (3 tipos usando el ID generado)
        TicketType::create([
            'match_id'  => $match->id,
            'zone'      => 'Tribuna',
            'price'     => 120.00,
            'remaining' => 5,
        ]);
        TicketType::create([
            'match_id'  => $match->id,
            'zone'      => 'Lateral',
            'price'     => 80.00,
            'remaining' => 150,
        ]);
        TicketType::create([
            'match_id'  => $match->id,
            'zone'      => 'Gol',
            'price'     => 60.00,
            'remaining' => 300,
        ]);
    }
}