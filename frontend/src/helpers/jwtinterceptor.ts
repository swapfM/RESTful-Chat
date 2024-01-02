import axios, { AxiosInstance } from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import { useAuthService } from "../services/AuthServices";

const API_BASE_URL = BASE_URL;

const useAxiosWithInterceptor = (): AxiosInstance => {
  const jwtAxios = axios.create({ baseURL: API_BASE_URL });
  const navigate = useNavigate();
  const { logout } = useAuthService();

  jwtAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const errStatus = error.response?.status;
      if (errStatus === 401 || errStatus === 403) {
        axios.defaults.withCredentials = true;

        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/token/refresh/"
          );
          if (response["status"] == 200) {
            return jwtAxios(originalRequest);
          }
        } catch (refreshError) {
          logout();
          navigate("/login");
          return Promise.reject(refreshError);
        }
      }
    }
  );

  return jwtAxios;
};

export default useAxiosWithInterceptor;
