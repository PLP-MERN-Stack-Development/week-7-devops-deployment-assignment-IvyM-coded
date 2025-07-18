import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Get the backend URL from environment variables
const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks from the backend
  useEffect(() => {
    axios.get(`${API_URL}/tasks`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  // Handle form submission to add a new task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    axios.post(`${API_URL}/tasks`, { title: newTask })
      .then(response => {
        setTasks([response.data, ...tasks]); // Add new task to the top
        setNewTask(''); // Clear input field
      })
      .catch(error => console.error("Error adding task:", error));
  };

  // Handle task deletion
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch(error => console.error("Error deleting task:", error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MERN Task Manager</h1>
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="task-input"
          />
          <button type="submit" className="add-button">Add Task</button>
        </form>
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task._id}>
              {task.title}
              <button onClick={() => handleDelete(task._id)} className="delete-button">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;