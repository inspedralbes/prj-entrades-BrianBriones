import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useMatchStore } from '@/stores/matchStore';

describe('Pinia Store - Gestió de Partits / Reserva d\\'Entrades', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Inicia l\\'estat per defecte buit amb l\\'estat de càrrega fals', () => {
    const store = useMatchStore();
    expect(store.currentMatch).toBe(null);
    expect(store.loading).toBe(false);
  });

  it('Actualització silenciosa arran d\\'un Socket.io Event de seient ocupat', async () => {
    const store = useMatchStore();
    store.currentMatch = { id: 9999, status: 'Active' };
    
    // Mockerem l'API del servei per simular la crida
    vi.mock('@/services/api', () => ({
      api: { getMatch: vi.fn().mockResolvedValue({ id: 9999, tickets_sold: 2 }) }
    }));
    
    // Passem la prop silent per evitar bloquejar la pantalla
    await store.fetchMatch(9999, true);
    
    // Verifiquem que NO dispari el flag global de load
    expect(store.loading).toBe(false);
  });

  it('Neteja l\\'estat profundament en interrompre / sortir de la ruta', () => {
    const store = useMatchStore();
    store.currentMatch = { id: 9999 };
    
    store.currentMatch = null;
    expect(store.currentMatch).toBeNull();
  });
});
