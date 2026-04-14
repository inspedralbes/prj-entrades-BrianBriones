<?php
declare(strict_types=1);
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
final class TicketType extends Model
{
    use HasFactory;
    protected $fillable = [
        'match_id',
        'zone',
        'price',
        'remaining',
    ];
    protected $casts = [
        'price' => 'decimal:2',
        'remaining' => 'integer',
    ];
    public function match(): BelongsTo
    {
        return $this->belongsTo(FootballMatch::class, 'match_id');
    }
}