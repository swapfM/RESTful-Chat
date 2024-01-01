import Home from "./screens/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Explore from "./screens/Explore";
import ToggleColorMode from "./components/ToggleColorMode";
import Server from "./screens/Server";
import Login from "./screens/Login";
import { AuthServiceProvider } from "./context/AuthContext";
import TestLogin from "./screens/TestLogin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/explore/:categoryName" element={<Explore />} />
      <Route path="/server/:serverId/:channelId?" element={<Server />} />
      <Route path="/login" element={<Login />} />
      <Route path="/testlogin" element={<TestLogin />} />
    </Route>
  )
);

const App = () => {
  return (
    <AuthServiceProvider>
      <ToggleColorMode>
        <RouterProvider router={router} />
      </ToggleColorMode>
    </AuthServiceProvider>
  );
};
export default App;
