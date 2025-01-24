import React from "react";
import { useParams, Link } from "react-router-dom";

function TaskDetails({ tasks }) {
  const { id } = useParams(); // Get the task ID from URL params
  const task = tasks.find((task) => task.id === parseInt(id));

  if (!task) return <div>Task not found</div>;

  return (
    <div className="task-details-container">
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <Link to="/">Back to Task List</Link>
    </div>
  );
}

export default TaskDetails;
