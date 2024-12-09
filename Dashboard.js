import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    async function fetchTasks() {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/tasks', newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewTask({ title: '', description: '' });
      // Reload tasks
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Task Dashboard</h2>
      <input
        type="text"
        placeholder="Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
