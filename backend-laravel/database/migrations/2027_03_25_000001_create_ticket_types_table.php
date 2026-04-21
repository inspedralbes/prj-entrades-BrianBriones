<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ticket_types', function (Blueprint $table): void {
            $table->id();
            // cascadeOnDelete() hace que si el partido se borra, sus tickets también
            $table->foreignId('match_id')->constrained('matches')->cascadeOnDelete();
            $table->string('zone');
            $table->decimal('price', 8, 2);
            $table->integer('remaining');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('ticket_types');
    }
};