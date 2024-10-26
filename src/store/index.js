import { createStore } from "vuex";
import apiClient from "../api";

const store = createStore({
  state: {
    user: null,
    token: localStorage.getItem("token") || "",
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    clearAuth(state) {
      state.user = null;
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await apiClient.post("/login", credentials);
        const token = response.data.jwt;
        const user = response.data.user;

        commit("setToken", token);
        commit("setUser", user);
      } catch (error) {
        const message = error.response?.data?.error || "Erro ao realizar login";
        throw new Error(message);
      }
    },
    async logout({ commit }) {
      try {
        const response = await apiClient.delete("/logout", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return response;
      } catch (error) {
        console.error("Erro ao realizar logout:", error);
        throw error;
      } finally {
        localStorage.removeItem("token");
        commit("clearAuth");
      }
    },
    async fetchUser({ commit }) {
      try {
        const response = await apiClient.get("/me");
        commit("setUser", response.data);
      } catch (error) {
        commit("clearAuth");
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    user: (state) => state.user,
  },
});

export default store;
