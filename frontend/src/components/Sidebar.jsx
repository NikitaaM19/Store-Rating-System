import {
  FaStore,
  FaUsers,
  FaChartBar,
  FaSignOutAlt
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

import "./Sidebar.css";

function Sidebar() {

  return (
    <div className="sidebar">

      <h2 className="logo">
        Store<span>Rating</span>
      </h2>

      <nav className="menu">

        <NavLink to="/admin" end>
          <FaChartBar />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/users">
          <FaUsers />
          <span>Users</span>
        </NavLink>

        <NavLink to="/admin/stores">
          <FaStore />
          <span>Stores</span>
        </NavLink>

      </nav>

      <div className="logout">
        <NavLink to="/">
          <FaSignOutAlt />
          <span>Logout</span>
        </NavLink>
      </div>

    </div>
  );
}

export default Sidebar;