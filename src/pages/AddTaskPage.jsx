import React, { useState } from "react";
import { Box, Input, Button, Text, Select, VStack, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_TASKS_ENDPOINT = `${API_BASE_URL}/tasks`;

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
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!taskData.title || !taskData.description || !taskData.deadline) {
      alert("⚠️ Semua field harus diisi!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(API_TASKS_ENDPOINT, taskData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201 || response.status === 200) {
        alert("✅ Task berhasil ditambahkan!");
        setTaskData({ title: "", description: "", priority: "Sedang", status: "Pending", deadline: "" });
        navigate("/dashboard");
      } else {
        alert(`❌ Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Task creation error:", error);
      alert(`❌ Gagal menambahkan task! ${error.response?.data?.message || "Terjadi kesalahan"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
      <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
        Tambah Task Baru
      </Text>
      <VStack spacing={4} align="stretch">
        <Box>
          <Text fontSize="sm" color="gray.600" mb={1}>Judul Task</Text>
          <Input name="title" placeholder="Masukkan judul task" value={taskData.title} onChange={handleChange} borderColor="gray.500" />
        </Box>

        <Box>
          <Text fontSize="sm" color="gray.600" mb={1}>Deskripsi Task</Text>
          <Input name="description" placeholder="Masukkan deskripsi task" value={taskData.description} onChange={handleChange} borderColor="gray.500" />
        </Box>

        <Box>
          <Text fontSize="sm" color="gray.600" mb={1}>Prioritas</Text>
          <Select name="priority" value={taskData.priority} onChange={handleChange} borderColor="gray.500">
            <option value="Tinggi">Tinggi</option>
            <option value="Sedang">Sedang</option>
            <option value="Rendah">Rendah</option>
          </Select>
        </Box>

        <Box>
          <Text fontSize="sm" color="gray.600" mb={1}>Status</Text>
          <Select name="status" value={taskData.status} onChange={handleChange} borderColor="gray.500">
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Select>
        </Box>

        <Box>
          <Text fontSize="sm" color="gray.600" mb={1}>Deadline</Text>
          <Input type="date" name="deadline" value={taskData.deadline} onChange={handleChange} borderColor="gray.500" />
        </Box>

        <Button colorScheme="blue" onClick={handleSubmit} isDisabled={loading}>
          {loading ? <Spinner size="sm" /> : "Tambah Task"}
        </Button>
      </VStack>
    </Box>
  );
};

export default AddTaskPage;


