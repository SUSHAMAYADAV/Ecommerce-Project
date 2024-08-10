import axios from "axios";
const Jwtaxios = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});

// Request interceptor
 Jwtaxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("tokens");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); 

export default Jwtaxios;