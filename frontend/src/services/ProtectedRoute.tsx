import { Navigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuthServiceContext();

  if (isLoggedIn) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" replace={true} />;
  }
};

export default ProtectedRoute;
