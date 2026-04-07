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
        await api.reserveTicket({
          ticket_type_id: this.selectedTicket,
          quantity: this.quantity,
          match_id: this.matchId
        });
        this.success = true;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
});
