<?php
declare(strict_types=1);
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
final class FootballMatch extends Model
{
    use HasFactory;
    // Conectamos el modelo a la tabla 'matches' intencionalmente
    protected $table = 'matches';
    protected $fillable = [
        'home_team',
        'away_team',
        'stadium',
        'date',
    ];
    protected $casts = [
        'date' => 'datetime',
    ];
    public function ticketTypes(): HasMany
    {
        return $this->hasMany(TicketType::class, 'match_id');
    }
}