import { defineStore } from 'pinia';
import { api } from '~/services/api';

export const useMatchStore = defineStore('match', {
  state: () => ({
    matches: [],
    currentMatch: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchMatches() {
      this.loading = true;
      try {
        const response = await api.getMatches();
        this.matches = response.data ? response.data : response; 
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchMatch(id) {
      this.loading = true;
      this.currentMatch = null;
      try {
        const response = await api.getMatch(id);
        this.currentMatch = response.data ? response.data : response;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
});
