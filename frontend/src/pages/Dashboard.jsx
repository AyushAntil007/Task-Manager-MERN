import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Dashboard.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-header-title">Dashboard</h1>
          <button onClick={handleLogout} className="dashboard-logout-btn">Logout</button>
        </div>

        {/* Add Task Section */}
        {userRole !== 'admin' && (
          <div className="dashboard-add-task-card">
            <h2 className="dashboard-section-title">Add New Task</h2>
            <div className="dashboard-form-group">
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Enter task"
                className="dashboard-input"
                onKeyPress={e => e.key === 'Enter' && createTask()}
              />
              <button onClick={createTask} className="dashboard-button">Add Task</button>
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="dashboard-tasks-card">
          <h2 className="dashboard-section-title">{userRole === 'admin' ? 'All Tasks' : 'Your Tasks'}</h2>
          
          {Object.entries(groupedTasks).length === 0 ? (
            <p className="dashboard-no-tasks">No tasks found</p>
          ) : (
            Object.entries(groupedTasks).map(([userName, userTasks]) => (
              <div key={userName} className="dashboard-user-tasks-group">
                <h3 className="dashboard-user-name">{userRole === 'admin' ? `${userName}'s Tasks` : `Hi ${userName} !`}</h3>
                {userTasks.map(task => (
                  <div key={task._id} className="dashboard-task-item">
                    {editId === task._id && userRole !== 'admin' ? (
                      <div className="dashboard-edit-mode">
                        <input
                          type="text"
                          value={editText}
                          onChange={e => setEditText(e.target.value)}
                          className="dashboard-input"
                          style={{ flex: 1 }}
                        />
                        <button onClick={() => updateTask(task._id)} className="dashboard-button-small">Update</button>
                        <button onClick={() => setEditId(null)} className="dashboard-button-small dashboard-cancel-btn">Cancel</button>
                      </div>
                    ) : (
                      <div className="dashboard-task-content">
                        <span className="dashboard-task-text">• {task.title}</span>
                        <div className="dashboard-buttons-group">
                          {userRole !== 'admin' && (
                            <button onClick={() => startEdit(task)} className="dashboard-button-small">Edit</button>
                          )}
                          {userRole === 'admin' && (
                            <button onClick={() => deleteTask(task._id)} className="dashboard-button-small dashboard-delete-btn">Delete</button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}