import { Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import TaskDetail from "../pages/TaskDetail";
import AddTaskPage from "../pages/AddTaskPage"; // ✅ Ensure this is correctly exported

// 🔐 Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user); // ✅ Extract user properly

  console.log("🔍 Checking auth state:", user); // 🔍 Debugging auth state

  return user ? children : <Navigate to="/login" replace />;
};

// 🔄 Redirect Logged-in Users Away from `/login` and `/register`
const RedirectIfAuthenticated = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  return user ? <Navigate to="/dashboard" replace /> : children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔄 Redirect '/' to '/login' */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 🔹 Public Routes (Redirect Logged-in Users) */}
      <Route path="/login" element={<RedirectIfAuthenticated><LoginPage /></RedirectIfAuthenticated>} />
      <Route path="/register" element={<RedirectIfAuthenticated><RegisterPage /></RedirectIfAuthenticated>} />

      {/* 🔒 Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/task/:id" element={<ProtectedRoute><TaskDetail /></ProtectedRoute>} />
      <Route path="/add-task" element={<ProtectedRoute><AddTaskPage /></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;
