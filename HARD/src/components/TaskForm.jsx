import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TaskForm({ task, onSubmit }) {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const navigate = useNavigate();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: task ? task.id : Date.now(),
      title,
      description,
    };

    onSubmit(newTask); // Submit the task (add or edit)
    navigate("/"); // Navigate back to task list after submission
  };

  return (
    <div className="task-form-container">
      <h1>{task ? "Edit Task" : "Add New Task"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{task ? "Save Changes" : "Save Task"}</button>
      </form>
    </div>
  );
}

export default TaskForm;
