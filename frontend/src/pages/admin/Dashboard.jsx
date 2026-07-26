import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import API from "../../services/api";

import {
  FaUsers,
  FaStore,
  FaStar,
  FaUserTie
} from "react-icons/fa";

import "./Dashboard.css";

function Dashboard() {

  const [data, setData] = useState({
    totalUsers: 0,
    totalOwners: 0,
    totalStores: 0,
    totalRatings: 0
  });

  const loadDashboard = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <Navbar />

        <div className="dashboard-container">

          <p className="dashboard-subtitle">
            Monitor users, stores, and ratings at a glance.
          </p>
         
          <div className="cards">

            <Card
              title="Total Users"
              value={data.totalUsers}
              icon={<FaUsers />}
            />


            <Card
              title="Total Stores"
              value={data.totalStores}
              icon={<FaStore />}
            />

            <Card
              title="Total Ratings"
              value={data.totalRatings}
              icon={<FaStar />}
            />

          </div>

          <div className="overview">

            <h2>System Overview</h2>

            <p>
              This dashboard provides a quick summary of platform activity.
              You can manage users, monitor stores, and track ratings efficiently.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="dashboard-card">
      <div className="card-icon">{icon}</div>

      <div className="card-info">
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
    </div>
  );
}

export default Dashboard;