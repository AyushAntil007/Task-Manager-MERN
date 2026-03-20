import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

  // redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      setUserRole(payload.role || '');
    } catch {
      setUserRole('');
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
      alert('Failed to load tasks');
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
      alert('Failed to create task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (error) {
      alert('Failed to delete task');
    }
  };

  // start editing
  const startEdit = (task) => {
    setEditId(task._id);
    setEditText(task.title);
  };

  // update task
  const updateTask = async (id) => {
    try {
      await axios.put(
        `http://127.0.0.1:5000/api/tasks/${id}`,
        { title: editText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEditId(null);
      setEditText('');
      fetchTasks();
    } catch (error) {
      alert('Failed to update task');
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);


  const groupedTasks = tasks.reduce((acc, task) => {
  const userName = task.user?.name || "Unknown";

  if (!acc[userName]) {
    acc[userName] = [];
  }

  acc[userName].push(task);
  return acc;
}, {});

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Add Task (not available to admin) */}
      {userRole !== 'admin' && (
        <>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter task"
          />
          <button onClick={createTask}>Add Task</button>
        </>
      )}

      {/* Task List */}
      {Object.entries(groupedTasks).map(([userName, userTasks]) => (
        <div key={userName} style={{ marginTop: '20px' }}>

          <h3>{userName}</h3>

          {userTasks.map(task => (
            <div key={task._id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>- {task.title}</span>
              {userRole === 'admin' && (
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              )}
            </div>
          ))}

        </div>
      ))}

    </div>
  );
}