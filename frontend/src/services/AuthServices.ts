import axios from "axios";
import { AuthServiceProps } from "../@types/auth-service";
import { useState } from "react";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";

export function useAuthService(): AuthServiceProps {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");

    return loggedIn !== null && loggedIn === "true";
  });

  const navigate = useNavigate();
  const getUserDetails = async () => {
    try {
      const user_id = localStorage.getItem("user_id");

      const response = await axios.get(
        `http://127.0.0.1:8000/api/account/?user_id=${user_id}`,
        {
          withCredentials: true,
        }
      );
      const userDetails = response.data;
      localStorage.setItem("username", userDetails.username);
    } catch (error: unknown) {
      setIsLoggedIn(() => false);
      localStorage.setItem("isLoggedIn", "false");
      return error;
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      const user_id = response.data.user_id;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user_id", user_id);
      setIsLoggedIn(true);
      getUserDetails();
    } catch (error: unknown) {
      return error;
    }
  };
  const refreshAccessToken = async () => {
    try {
      await axios.post(
        `${BASE_URL}/token/refresh/`,
        {},
        { withCredentials: true }
      );
    } catch (refreshError) {
      console.log("errorrr");
      return Promise.reject(refreshError);
    }
  };
  const logout = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/login");
  };
  return { login, isLoggedIn, logout, refreshAccessToken };
}
