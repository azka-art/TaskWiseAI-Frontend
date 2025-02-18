import { Box, Text, Badge, Button, Flex } from "@chakra-ui/react";
import "../assets/styles/taskItem.css"; // ✅ Import TaskItem specific styles

// 🎨 Utility Functions
const getStatusClass = (status) => {
  const statusClasses = {
    "Pending": "pending",
    "In Progress": "in-progress",
    "Completed": "completed"
  };
  return statusClasses[status] || "";
};

const getPriorityClass = (priority) => {
  const priorityClasses = {
    "Tinggi": "high-priority",
    "Sedang": "medium-priority",
    "Rendah": "low-priority"
  };
  return priorityClasses[priority] || "";
};

// 📌 TaskItem Component
function TaskItem({ task, onDelete }) {
  const { title, description, status, priority, deadline } = task;

  return (
    <Box className="task-card">
      {/* 🔹 Header: Task Title & Status Badge */}
      <Flex className="task-header">
        <Box className="task-info">
          <Text className="task-title">{title}</Text>
        </Box>
      </Flex>

      {/* 📝 Task Description */}
      <Text className="task-description">{description}</Text>

      {/* ⏳ Deadline & Priority */}
      <Text className="task-deadline"><strong>Deadline:</strong>  {deadline}</Text>
      <Text className="task-priority">
        <strong>Prioritas:</strong> 
        <span className={getPriorityClass(priority)}>{priority}</span>
      </Text>

      {/* 🔹 Footer: View & Delete Buttons */}
      <Flex className="task-footer">
    <Button className="update-button">Update</Button>
    <Button className="delete-button" onClick={onDelete}>Delete</Button>
    <Text className={`status-badge ${getStatusClass(task.status)}`}>{task.status}</Text>
</Flex>
    </Box>
  );
}

export default TaskItem;


