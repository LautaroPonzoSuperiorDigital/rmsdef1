import axios from "axios";
import { useStateContext } from "./context/contextProvider";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  const { state } = useStateContext();
  const token = state.token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
      window.location.href = "/";
    } else if (response.status === 404) {
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
