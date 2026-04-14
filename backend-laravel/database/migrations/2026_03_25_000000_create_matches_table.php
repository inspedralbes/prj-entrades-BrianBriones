<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('matches', function (Blueprint $table): void {
            $table->id();
            $table->string('home_team');
            $table->string('away_team');
            $table->string('stadium');
            $table->dateTime('date');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};