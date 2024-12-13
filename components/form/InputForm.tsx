"use client";

import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import SearchForm from "@/components/search/SearchForm";

const InputForm = () => {
  const [task, setTask] = useState(""); // State to store the current value of the task input
  const [tasks, setTasks] = useState<string[]>([]); // State to store an array of added tasks
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const addTask = () => {
    // If the task is an empty string (after removing whitespace), exit the function
    if (task.trim() === "") return;
    // Add the new task to the existing array of tasks using the spread operator
    // prevTasks refer to the previous tasks array
    setTasks((prevTasks) => [...prevTasks, task]);
    // Clear the input field after adding the task.
    setTask("");
  };

  const editTask = (index: number) => {
    setIsEditing(index);
    setTask(tasks[index]);
  };

  const saveTask = () => {
    if (task.trim() === "" || isEditing === null) return;
    const updatedTasks = tasks.map((t, i) => (i === isEditing ? task : t));
    setTasks(updatedTasks);
    setTask("");
    setIsEditing(null);
  };

  // Filter out the task at the specified index, keeping all other tasks.
  //The underscore (_) indicates that the first argument of filter (the task) is unused.
  const removeTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    // Update the state with the new array of tasks.
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-6 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen w-full">
      <SearchForm />
      <h1 className="text-4xl font-bold text-white">My To-Do List</h1>

      <div className="flex items-center w-full max-w-md gap-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder={isEditing !== null ? "Edit task" : "Add task"}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isEditing !== null ? (
          <button
            onClick={saveTask}
            className="bg-green-500 hover:bg-green-400 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all transform hover:scale-105"
          >
            Save
          </button>
        ) : (
          <button
            onClick={addTask}
            className="bg-yellow-500 hover:bg-yellow-400 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all transform hover:scale-105"
          >
            Add
          </button>
        )}
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

                <div className="flex space-x-2">
                  <button
                    onClick={() => editTask(index)}
                    className="text-blue-500 hover:text-blue-700 transition-all flex items-center justify-center"
                    aria-label="Edit task"
                  >
                    <Edit />
                  </button>

                  <button
                    onClick={() => removeTask(index)}
                    className="text-red-500 hover:text-red-700 transition-all flex items-center justify-center"
                    aria-label="Delete task"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InputForm;
