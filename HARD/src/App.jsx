import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskDetails from "./components/TaskDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  // Add a task
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Edit a task: Set the task to be edited
  const editTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setCurrentTask(taskToEdit); // Store the task to edit
  };

  // Save the edited task
  const saveEditedTask = (editedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === editedTask.id ? editedTask : task
    );
    setTasks(updatedTasks);
    setCurrentTask(null); // Clear the current task after saving
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
          }
        />
        <Route path="/add" element={<TaskForm onSubmit={addTask} />} />
        <Route
          path="/edit/:id"
          element={<TaskForm task={currentTask} onSubmit={saveEditedTask} />}
        />
        <Route path="/task/:id" element={<TaskDetails tasks={tasks} />} />
      </Routes>
    </Router>
  );
}

export default App;
