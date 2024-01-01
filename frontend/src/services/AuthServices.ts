import axios from "axios";
import { AuthServiceProps } from "../@types/auth-service";
import { useState } from "react";

export function useAuthService(): AuthServiceProps {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const getUserDetails = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/token/user_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const userDetails = response.data;
      localStorage.setItem("username", userDetails.username);
    } catch (error: unknown) {
      setIsLoggedIn(() => false);
      return error;
    }
  };
  const getUserIdFromToken = (access: string) => {
    const tokenParts = access.split(".");
    const encodedPayload = tokenParts[1];
    const decodedPayload = atob(encodedPayload);
    const payloadData = JSON.parse(decodedPayload);
    const userId = payloadData.user_id;

    return userId;
  };
  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });
      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("userId", getUserIdFromToken(access));
      setIsLoggedIn(() => true);
    } catch (error: unknown) {
      return error;
    }
  };
  return { login, isLoggedIn };
}
