"use client";

import React, { useState } from 'react';
import './style.css';

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState({
        name: '', 
        description: '', 
        deadline: '',
        status: 'Belum Diserahkan',
    });

    // Function to add a new task
    const addTask = () => {
        const { name, description, deadline } = taskInput;
        
        // Check if all fields are filled
        if (!name || !description || !deadline) {
            alert('All fields are required!');
            return;
        }

        setTasks([...tasks, { ...taskInput }]);
        setTaskInput({ name: '', description: '', deadline: '', status: 'Belum Diserahkan' });
    };

    // Function to delete a task
    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    // Function to format the deadline
    const formatDeadline = (deadline) => {
        const date = new Date(deadline);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}-${month}-${year}, ${hours}:${minutes}`;
    };

    // Function to render task list
    const renderTasks = () => {
        if (tasks.length === 0) {
            return <p className="no-tasks">No tasks available.</p>;
        }

        return tasks.map((task, index) => (
            <div key={index} className="task-card">
                <div className="task-details">
                    <p><strong>Task Name:</strong> {task.name}</p>
                    <p><strong>Task Description:</strong> {task.description}</p>
                    <p><strong>Batas Waktu:</strong> {formatDeadline(task.deadline)}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                </div>
                <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
            </div>
        ));
    };

    return (
        <div className="task-manager">
            <h1 className="title">Task Management System</h1>
            <div className="input-container">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Task Name"
                    value={taskInput.name}
                    onChange={(e) => setTaskInput({ ...taskInput, name: e.target.value })}
                />
                <textarea
                    className="input-field"
                    placeholder="Task Description"
                    value={taskInput.description}
                    onChange={(e) => setTaskInput({ ...taskInput, description: e.target.value })}
                />
                <input
                    type="datetime-local"
                    className="input-field"
                    value={taskInput.deadline}
                    onChange={(e) => setTaskInput({ ...taskInput, deadline: e.target.value })}
                />
                <select
                    className="input-field"
                    value={taskInput.status}
                    onChange={(e) => setTaskInput({ ...taskInput, status: e.target.value })}
                >
                    <option value="Belum Diserahkan">Belum Diserahkan</option>
                    <option value="Sudah Diserahkan">Sudah Diserahkan</option>
                </select>
                <button className="add-button" onClick={addTask}>Add Task</button>
            </div>
            <div className="task-list">
                {renderTasks()}
            </div>
        </div>
    );
}
