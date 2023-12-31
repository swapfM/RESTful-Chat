import Home from "./screens/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Explore from "./screens/Explore";
import ToggleColorMode from "./components/ToggleColorMode";
import Server from "./screens/Server";
import Login from "./screens/Login";
import { AuthServiceProvider } from "./context/AuthContext";
import TestLogin from "./screens/TestLogin";
import ProtectedRoute from "./services/ProtectedRoute";
import Register from "./screens/Register";

const App = () => {
  return (
    <BrowserRouter>
      <AuthServiceProvider>
        <ToggleColorMode>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore/:categoryName" element={<Explore />} />
            <Route
              path="/server/:serverId/:channelId?"
              element={
                <ProtectedRoute>
                  <Server />
                </ProtectedRoute>
              }
            />

            <Route
              path="/testlogin"
              element={
                <ProtectedRoute>
                  <TestLogin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ToggleColorMode>
      </AuthServiceProvider>
    </BrowserRouter>
  );
};

export default App;
