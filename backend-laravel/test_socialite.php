<?php
define('LARAVEL_START', microtime(true));
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $url = \Laravel\Socialite\Facades\Socialite::driver('google')->stateless()->redirect()->getTargetUrl();
    echo "URL: " . $url . "\n";
} catch (\Throwable $e) {
    echo "ERROR: " . get_class($e) . ': ' . $e->getMessage() . "\n";
}
