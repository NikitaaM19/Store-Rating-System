import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Stores from "./pages/admin/Stores";
import Home from "./pages/user/Home";
import OwnerDashboard from "./pages/owner/Dashboard";
import UserDashboard from "./pages/user/UserDashboard";
import ChangePassword from "./pages/user/ChangePassword";

import StoreCard from "./pages/user/StoreCard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
{
    path: "/user/dashboard",
    element: <UserDashboard />
  },
  {
    path: "/register",
    element: <Register />
  },

  {
    path: "/admin/dashboard",
    element: <Dashboard />
  },

  {
    path: "/admin/users",
    element: <Users />
  },

  {
    path: "/admin/stores",
    element: <Stores />
  },
 {
    path: "/user/storecard",
    element: <StoreCard />
  },
  {
    path: "/user/home",
    element: <Home />
  },

  {
    path: "/owner/dashboard",
    element: <OwnerDashboard />
  },
  
{
  path: "/change-password",
  element: <ChangePassword />
}
]);

export default router;