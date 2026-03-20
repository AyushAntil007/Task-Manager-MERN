import { useEffect, useState } from "react";
import axios from 'axios';

export default function Dashboard(){
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');

    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/';
    }

    //get tasks

    const fetchTasks = async ()=>{
        const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
        });
    setTasks(res.data);
    };


  //create tasks
    
  const createTask = async () => {
    await axios.post('http://localhost:5000/api/tasks',
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTasks();
  };


  useEffect(()=>{
    fetchTasks();
  }, []);

  return (
     <div>
      <h2>Dashboard</h2>

      <input onChange={e => setTitle(e.target.value)} />
      <button onClick={createTask}>Add Task</button>

      {tasks.map(task => (
        <p key={task._id}>{task.title}</p>
      ))}
    </div>
  );



}