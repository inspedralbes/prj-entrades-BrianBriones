<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'match_id',
        'ticket_type_id',
        'seats',
        'total_price',
    ];

    protected function casts(): array
    {
        return [
            'seats' => 'array',
            'total_price' => 'decimal:2',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function match()
    {
        return $this->belongsTo(FootballMatch::class, 'match_id');
    }

    public function ticketType()
    {
        return $this->belongsTo(TicketType::class);
    }
}
