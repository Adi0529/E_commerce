import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e-commerce-2-u41a.onrender.com/",
});
axiosInstance.interceptors.request.use( 
    (config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;