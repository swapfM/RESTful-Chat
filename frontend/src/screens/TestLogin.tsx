import { useState } from "react";
import { useAuthServiceContext } from "../context/AuthContext";
import useAxiosWithInterceptor from "../helpers/jwtinterceptor";

const TestLogin = () => {
  const { isLoggedIn, logout } = useAuthServiceContext();
  const [username, setUsername] = useState("");
  const jwtAxios = useAxiosWithInterceptor();

  const getUserDetails = async () => {
    try {
      const response = await jwtAxios.get(
        `http://127.0.0.1:8000/api/account/?user_id=1`,
        {
          withCredentials: true,
        }
      );
      const userDetails = response.data;
      setUsername(userDetails.username);
    } catch (error: unknown) {
      return error;
    }
  };
  return (
    <>
      <div>{isLoggedIn.toString()}</div>
      <button onClick={logout}>click</button>
      <button onClick={getUserDetails}>get details</button>
      <div>username : {username}</div>
    </>
  );
};
export default TestLogin;
