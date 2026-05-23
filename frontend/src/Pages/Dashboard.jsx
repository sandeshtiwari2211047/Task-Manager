import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import RecentTasks from "../components/RecentTasks";
import TaskChart from "../components/TaskChart";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] =
  useState(true);

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);

      setLoading(false);

      const completed = res.data.filter(
        (task) => task.status === "Completed"
      ).length;

      const pending = res.data.filter(
        (task) => task.status === "Pending"
      ).length;

      const overdue = res.data.filter(
        (task) => new Date(task.dueDate) < new Date()
      ).length;

      setStats({
        total: res.data.length,
        completed,
        pending,
        overdue,
      });

    } catch (error) {

      console.log(error);

    }
  };

  if (loading) {

  return (

    <div className="loading">

      Loading Dashboard...

    </div>

  );
}

  return (
    <Layout>

      <Navbar />

      <StatsCards stats={stats} />

      <TaskChart tasks={tasks} />

      <RecentTasks tasks={tasks} />

    </Layout>
  );
}

export default Dashboard;