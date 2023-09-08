import React from 'react';
import { useTask } from '../../Contexts/TaskContext';

function TaskTray() {
  const { tasks, updateTaskStatus } = useTask();

  const handleProgressUpdate = (taskId, newStatus) => {
    updateTaskStatus(taskId, newStatus);
  };

  return (
    <div>
      <h2>Task Tray</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div>
              <strong>Title:</strong> {task.title}
            </div>
            <div>
              <strong>Description:</strong> {task.description}
            </div>
            <div>
              <strong>Due Date:</strong> {task.dueDate}
            </div>
            <div>
              <strong>Priority:</strong> {task.priority}
            </div>
            <div>
              <strong>Status:</strong> {task.status}
            </div>
            <div>
              <strong>Assigned To:</strong> {task.assignedTo}
            </div>
            <div>
              <strong>Assigned Team:</strong> {task.assignedTeam}
            </div>
            <div>
              <strong>Progress:</strong> {task.progress}
            </div>
            <button
              onClick={() => handleProgressUpdate(task.id, 'In Progress')}
            >
              Start Progress
            </button>
            <button
              onClick={() => handleProgressUpdate(task.id, 'Completed')}
            >
              Complete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskTray;
