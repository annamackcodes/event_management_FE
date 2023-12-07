import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.url.includes("/login") || config.url.includes("/signup")) {
    localStorage.removeItem("token");
    return config;
  } else if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default api;
