<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MatchApiTest extends TestCase
{
    /**
     * Valida la transparència en l'adquisició del llistat
     */
    public function test_can_fetch_api_match_list()
    {
        $response = $this->getJson('/api/matches');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data'
        ]);
    }

    /**
     * Verifica que el Panel d'Admin refusi accés de creació sense el JWT/Token OAuth
     */
    public function test_admin_match_creation_requires_authentication()
    {
        $payloadData = [
            'name' => 'El Clásico de Proves',
            'date' => '2026-05-30',
            'capacity' => 80000
        ];

        $response = $this->postJson('/api/admin/matches', $payloadData);

        // Sin un header valid bearer o middleware fallará con HTTP standard 401
        $response->assertStatus(401);
    }
}
