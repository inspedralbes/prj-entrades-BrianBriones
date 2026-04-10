export const api = {
  baseURL: 'http://localhost:4000/api',

  async getMatches() {
    const res = await fetch(`${this.baseURL}/matches`);
    if (!res.ok) throw new Error('Error al obtener partidos');
    return res.json();
  },

  async getMatch(id) {
    const res = await fetch(`${this.baseURL}/matches/${id}`);
    if (!res.ok) throw new Error('Error al obtener el partido');
    return res.json();
  },

  async reserveTicket(data, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const res = await fetch(`${this.baseURL}/tickets/reserve`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Error en la reserva');
    }
    return res.json();
  }
};
