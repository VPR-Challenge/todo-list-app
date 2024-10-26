import axios from "axios";
import store from "./store";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = store.state.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const isLoginRoute = originalRequest.url.includes("/login");

    if (error.response && error.response.status === 401 && !isLoginRoute) {
      store.dispatch("logout");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
