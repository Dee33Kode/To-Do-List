import React, { useState, useEffect } from 'react';
import { TbCancel } from "react-icons/tb";
import { LuNotebookPen } from "react-icons/lu";

const ToDoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Save note to localStorage when notes update
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!task.trim()) return;
    const newTasks = [...tasks, task.trim()];
    setTasks(newTasks);
    setTask('');
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="bg-green-100 min-h-screen py-10">
    <div className="bg-blue-800 p-8 rounded-2xl w-[500px] mx-auto mt-20 text-white shadow-xl font-serif">
      <h2 className="text-xl font-bold mb-6 text-gray-300 flex items-center gap-2 justify-center">
        TO-DO LIST <span role="img" aria-label="notepad"><LuNotebookPen className='text-gray-300'/></span>
      </h2>

      <div className="flex rounded-full overflow-hidden mb-6">
        <input
          type="text"
          className="flex-1 p-3 text-blue-400 bg-black outline-none"
          placeholder="Pls enter your task ahead"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-amber-500 px-6 text-white font-semibold"
        >
          Add
        </button>
      </div>

      <ul className="space-y-4">
        {tasks.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between text-lg"
          >
            <span className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full border-2 border-black inline-block"></span>
              {item}
            </span>
            <button
              onClick={() => handleDeleteTask(index)}
              className="text-white text-xl"
            >
                <TbCancel />
            </button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default ToDoList;