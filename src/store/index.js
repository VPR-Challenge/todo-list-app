import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    logout(state) {
      state.user = null;
      state.token = '';
      localStorage.removeItem('token');
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('localhost:3000', credentials);
        const token = response.data.token;
        const user = response.data.user;
        
        commit('setToken', token);
        commit('setUser', user);
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        throw new Error('Erro de login');
      }
    },
    logout({ commit }) {
      commit('logout');
      delete axios.defaults.headers.common['Authorization'];
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    user: state => state.user
  }
});
