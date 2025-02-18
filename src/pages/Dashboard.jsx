import { useEffect, useState } from "react";
import { getTasks } from "../api/api";
import useTaskStore from "../store/useTaskStore";
import useAuthStore from "../store/useAuthStore"; 
import TaskItem from "../components/TaskItem";
import { Box, Heading, Text, Spinner, Flex, VStack, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Dashboard.css"; // ✅ Import Dashboard CSS

function Dashboard() {
  const { tasks, setTasks } = useTaskStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getTasks()
      .then((res) => {
        console.log("Fetched tasks:", res.data);
        setTasks(Array.isArray(res.data.tasks) ? res.data.tasks : []);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setError("⚠️ Failed to load tasks. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [setTasks]);

  // ✅ Task Summary
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress").length;
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;

  // ✅ Logout Handler
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box className="dashboard-container">
      {/* 🚀 Header Section */}
      <Flex className="dashboard-header">
        <Text className="taskwise-logo">TaskWise-AI</Text>
        <HStack spacing={6} className="nav-links">
            <Text className="nav-link" onClick={() => navigate("/add-task")}>Add Task</Text>
            <Text className="separator">|</Text>
            <Text className="nav-link" onClick={handleLogout}>Logout</Text>
        </HStack>
    </Flex>

      {/* 🔹 Title Section */}
      <Box className="dashboard-title">
        <Heading as="h1" className="your-tasks-title">Your Tasks</Heading>
      </Box>

      {/* ✨ Motivational Quote Section */}
      <Box className="quote-box">
        <Text className="quote-text">
          <i>"A mountain of tasks isn’t an obstacle—it’s a journey. <br />
          Plan your course, set your priorities, and tackle each task
          like a captain steering through a storm. <br />
          With the right strategy, no challenge is too great to conquer!"</i>
        </Text>
      </Box>
      

      {/* 🏗 Task Summary & Task List */}
      <Flex className="dashboard-content">
        {/* ✅ Task List Section */}
        <Box className="task-list">
          {loading && (
            <Flex justify="center" align="center" mt={8}>
              <Spinner size="xl" color="var(--neon-blue)" />
            </Flex>
          )}

          {error && <Text className="error-message" mt={4}>{error}</Text>}

          {!loading && !error && (
            tasks.length > 0 ? (
              tasks.map((task) => <TaskItem key={task.id} task={task} className="task-card" />)
            ) : (
              <Text className="empty-state">🚀 No tasks available! Add one to get started.</Text>
            )
          )}
        </Box>
        {/* 📊 Task Summary Section */}
        <Box className="task-summary">
          <Text className="summary-header">Task Summary</Text>
          <Flex className="task-summary-item">
              <Text>Pending:</Text>
              <Text className="summary-value pending-value">{pendingTasks}</Text>
          </Flex>
          <Flex className="task-summary-item">
              <Text>In Progress:</Text>
              <Text className="summary-value in-progress-value">{inProgressTasks}</Text>
          </Flex>
          <Flex className="task-summary-item">
              <Text>Completed:</Text>
              <Text className="summary-value completed-value">{completedTasks}</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default Dashboard;


