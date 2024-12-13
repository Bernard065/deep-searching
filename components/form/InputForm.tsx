"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react"; // Add icon from Lucide or use Heroicons

const InputForm = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  // Event handler for form submission
  const addTask = () => {
    if (task.trim() === "") return;
    setTasks((prevTasks) => [...prevTasks, task]);
    setTask("");
  };

  const removeTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-6 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen w-full">
      <p>Search</p>
      <h1 className="text-4xl font-bold text-white">My To-Do List</h1>

      <div className="flex items-center w-full max-w-md gap-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="bg-yellow-500 hover:bg-yellow-400 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all transform hover:scale-105"
        >
          Add
        </button>
      </div>

      {/* Display existing tasks */}
      <div className="w-full max-w-md">
        {tasks.length === 0 ? (
          <p className="text-center text-white/80 italic">
            No tasks yet. Add a task to get started!
          </p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="text-gray-900 font-medium break-words max-w-xs">
                  {task}
                </span>

                <button
                  onClick={() => removeTask(index)}
                  className="text-red-500 hover:text-red-700 transition-all flex items-center justify-center"
                  aria-label="Delete task"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InputForm;
