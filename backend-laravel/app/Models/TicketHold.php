<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketHold extends Model
{
    protected $fillable = [
        'hold_id',
        'ticket_type_id',
        'quantity',
        'expires_at'
    ];

    public function ticketType()
    {
        return $this->belongsTo(TicketType::class, 'ticket_type_id');
    }
}
