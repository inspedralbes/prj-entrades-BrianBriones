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
  },

  async getOrders(token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${this.baseURL}/orders`, { headers });
    if (!res.ok) throw new Error('Error al obtener mis entradas');
    return res.json();
  },

  async getAdminStats(token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${this.baseURL}/admin/stats`, { headers });
    if (!res.ok) throw new Error('Error al obtener estadisticas');
    return res.json();
  },

  async createMatch(data, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${this.baseURL}/admin/matches`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error al guardar el evento');
    return res.json();
  }
};
