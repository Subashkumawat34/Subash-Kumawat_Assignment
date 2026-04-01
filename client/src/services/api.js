import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const scoreService = {
  getLeaderboard: async () => {
    const response = await api.get('/scores/leaderboard');
    return response.data;
  },
  createScore: async (scoreData) => {
    const response = await api.post('/scores', scoreData);
    return response.data;
  }
};

export const sessionService = {
  createSession: async (sessionId) => {
    const response = await api.post('/sessions', { sessionId });
    return response.data;
  },
  updateSession: async (sessionId, updateData) => {
    const response = await api.put(`/sessions/${sessionId}`, updateData);
    return response.data;
  }
};

export default api;
