import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  // get tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (error) {
      console.error('Fetch tasks error:', error);
      alert('Failed to load tasks: ' + (error?.response?.data?.msg || error.message));
    }
  };

  // create task
  const createTask = async () => {
    if (!title.trim()) {
      alert('Task title cannot be empty');
      return;
    }

    try {
      await axios.post(
        'http://127.0.0.1:5000/api/tasks',
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle('');
      fetchTasks();
    } catch (error) {
      console.error('Create task error:', error);
      alert('Failed to create task: ' + (error?.response?.data?.msg || error.message));
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  return (
    <div>
      <h2>Dashboard</h2>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={createTask}>Add Task</button>

      {tasks.map(task => (
        <p key={task._id}>{task.title}</p>
      ))}
    </div>
  );
}