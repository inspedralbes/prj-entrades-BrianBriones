<?php
namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TicketPurchaseConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Order $order) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '¡Compra confirmada! — ' . $this->order->match->home_team . ' vs ' . $this->order->match->away_team,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.ticket-confirmation',
        );
    }
}
