import { defineStore } from 'pinia';
import { api } from '~/services/api';

export const useTicketStore = defineStore('ticket', {
  state: () => ({
    selectedTicket: null,
    quantity: 1,
    matchId: null,
    loading: false,
    error: null,
    success: false
  }),
  actions: {
    async reserveTicket() {
      if (!this.selectedTicket) return;
      this.loading = true;
      this.error = null;
      this.success = false;
      try {
        // 1. Opcional: Crear HOLD temporal interactuando con api de BFF (ejemplo de flujo)
        // const holdRes = await fetch('http://localhost:4000/api/tickets/hold', { ... });
        // const holdId = holdRes.json().holdId;
        
        const token = useCookie('auth_token').value;
        await api.reserveTicket({
          ticket_type_id: this.selectedTicket,
          quantity: this.quantity,
          match_id: this.matchId
          // holdId: holdId // Pasarlo si usamos HOLD
        }, token);
        this.success = true;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
});
