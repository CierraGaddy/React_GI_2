import React from "react";
import { Link } from "react-router-dom";

function TaskList({ tasks, onDelete, onEdit }) {
  return (
    <div className="task-list-container">
      <h1>Task List</h1>
      <Link to="/add">
        <button className="add-task-btn">Add Task</button>
      </Link>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Link to={`/task/${task.id}`}>
              <span>{task.title}</span>
            </Link>
            <div>
              <Link to={`/edit/${task.id}`}>
                <button onClick={() => onEdit(task.id)}>Edit</button>
              </Link>
              <button onClick={() => onDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
