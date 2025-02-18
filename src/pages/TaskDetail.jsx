import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTaskById } from '../api/api';
import { Box, Text, Spinner, Badge } from '@chakra-ui/react';

function TaskDetail() {
  const { id } = useParams(); // Get task ID from URL
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTaskById(id)
      .then((res) => {
        setTask(res.data.task); // Adjusted to match MirageJS response format
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner size="xl" />;
  if (!task) return <Text>Task not found.</Text>;

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Text fontSize="2xl" fontWeight="bold">{task.title}</Text>
      <Text mt={2}>{task.description || 'No description available.'}</Text>

      <Box mt={4}>
        <Badge colorScheme={task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'yellow' : 'green'}>
          Priority: {task.priority}
        </Badge>
        <Badge ml={2} colorScheme={task.status === 'Done' ? 'green' : 'blue'}>
          Status: {task.status}
        </Badge>
        <Text mt={2}>Deadline: {task.deadline || 'No deadline set'}</Text>
      </Box>
    </Box>
  );
}

export default TaskDetail;
