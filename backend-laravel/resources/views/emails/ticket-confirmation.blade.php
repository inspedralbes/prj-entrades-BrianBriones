<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; }
    .header { background: #16a34a; padding: 32px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 22px; }
    .header p  { color: #bbf7d0; margin: 6px 0 0; font-size: 14px; }
    .body { padding: 32px; }
    .match-title { font-size: 20px; font-weight: bold; color: #111; text-align: center; margin-bottom: 4px; }
    .match-date  { text-align: center; color: #6b7280; font-size: 14px; margin-bottom: 28px; }
    .details { background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 24px; }
    .details table { width: 100%; border-collapse: collapse; }
    .details td { padding: 8px 0; font-size: 14px; color: #374151; }
    .details td:last-child { text-align: right; font-weight: bold; color: #111; }
    .total-row td { border-top: 1px solid #e5e7eb; padding-top: 14px; font-size: 16px; font-weight: bold; }
    .footer { background: #f9fafb; padding: 20px 32px; text-align: center; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>¡Compra confirmada!</h1>
      <p>Gracias por tu compra, {{ $order->user->name }}</p>
    </div>
    <div class="body">
      <div class="match-title">
        {{ $order->match->home_team }} vs {{ $order->match->away_team }}
      </div>
      <div class="match-date">
        {{ \Carbon\Carbon::parse($order->match->date)->format('l, d \d\e F \d\e Y — H:i') }}
        — {{ $order->match->stadium }}
      </div>
      <div class="details">
        <table>
          <tr>
            <td>Número de orden</td>
            <td>#{{ $order->id }}</td>
          </tr>
          <tr>
            <td>Asientos</td>
            <td>{{ implode(', ', $order->seats) }}</td>
          </tr>
          <tr>
            <td>Cantidad</td>
            <td>{{ count($order->seats) }} entrada(s)</td>
          </tr>
          <tr>
            <td>Precio por entrada</td>
            <td>{{ number_format($order->ticketType->price, 2) }} €</td>
          </tr>
          <tr class="total-row">
            <td>Total pagado</td>
            <td>{{ number_format($order->total_price, 2) }} €</td>
          </tr>
        </table>
      </div>
      <p style="font-size:13px; color:#6b7280; text-align:center;">
        Presenta este email o el número de orden <strong>#{{ $order->id }}</strong> en el estadio.
      </p>
    </div>
    <div class="footer">
      Enviado a {{ $order->user->email }} · © {{ date('Y') }} Entradas Fútbol
    </div>
  </div>
</body>
</html>
