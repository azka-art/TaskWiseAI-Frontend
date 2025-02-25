import React, { useState } from "react";
import { Box, Input, Button, Text, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/styles/addTask.css"; // Import CSS

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AddTaskPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Sedang",
    status: "Pending",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!taskData.title || !taskData.description || !taskData.deadline) {
      alert("⚠️ Semua field harus diisi!");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/tasks`, taskData, {
        headers: { "Content-Type": "application/json" },
      });

      alert("✅ Task berhasil ditambahkan!");
      setTaskData({
        title: "",
        description: "",
        priority: "Sedang",
        status: "Pending",
        deadline: "",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Task creation error:", error);
      alert(`❌ Gagal menambahkan task! ${error.response?.data?.message || "Terjadi kesalahan"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="add-task-container">
      <Text className="add-task-title">
        Tambah Task Baru
      </Text>

      <Box className="form-group">
        <Text className="form-label">Judul Task</Text>
        <Input
          className="form-input"
          type="text"
          name="title"
          placeholder="Masukkan judul task"
          value={taskData.title}
          onChange={handleChange}
        />
      </Box>

      <Box className="form-group">
        <Text className="form-label">Deskripsi Task</Text>
        <Input
          className="form-input"
          type="text"
          name="description"
          placeholder="Masukkan deskripsi task"
          value={taskData.description}
          onChange={handleChange}
        />
      </Box>

      <Box className="form-group">
        <Text className="form-label">Deadline</Text>
        <Input
          className="form-input"
          type="date"
          name="deadline"
          value={taskData.deadline}
          onChange={handleChange}
        />
      </Box>

      <Box className="form-group">
        <Text className="form-label">Prioritas</Text>
        <select
          className="form-select"
          name="priority"
          value={taskData.priority}
          onChange={handleChange}
        >
          <option value="Tinggi">Tinggi</option>
          <option value="Sedang">Sedang</option>
          <option value="Rendah">Rendah</option>
        </select>
      </Box>

      <Box className="form-group">
        <Text className="form-label">Status</Text>
        <select
          className="form-select"
          name="status"
          value={taskData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </Box>

      <Button
        className="submit-button"
        onClick={handleSubmit}
        isDisabled={loading}
      >
        {loading ? <Spinner size="sm" /> : "Tambah Task"}
      </Button>
    </Box>
  );
};

export default AddTaskPage;

