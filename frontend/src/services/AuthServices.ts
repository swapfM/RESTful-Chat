import axios from "axios";
import { AuthServiceProps } from "../@types/auth-service";
import { useState } from "react";
import { responsiveFontSizes } from "@mui/material";

export function useAuthService(): AuthServiceProps {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");

    return loggedIn !== null && loggedIn === "true";
  });

  // const getUserDetails = async () => {
  //   try {
  //     const userId = localStorage.getItem("userId");
  //     const accessToken = localStorage.getItem("access_token");
  //     console.log(userId);
  //     const response = await axios.get(
  //       `http://127.0.0.1:8000/api/account/?user_id=${userId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     const userDetails = response.data;
  //     localStorage.setItem("username", userDetails.username);
  //   } catch (error: unknown) {
  //     setIsLoggedIn(() => false);
  //     localStorage.setItem("isLoggedIn", "false");
  //     return error;
  //   }
  // };
  // const getUserIdFromToken = (access: string) => {
  //   const tokenParts = access.split(".");
  //   const encodedPayload = tokenParts[1];
  //   const decodedPayload = atob(encodedPayload);
  //   const payloadData = JSON.parse(decodedPayload);
  //   const userId = payloadData.user_id;

  //   return userId;
  // };
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

      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(() => true);
      // getUserDetails();
    } catch (error: unknown) {
      return error;
    }
  };
  const logout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
  };
  return { login, isLoggedIn, logout };
}
