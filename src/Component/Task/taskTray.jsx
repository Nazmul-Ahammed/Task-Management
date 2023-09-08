import React, { useState } from 'react';
import { useTask } from '../../Contexts/TaskContext';

function TaskTray() {
  const { tasks, updateTaskStatus } = useTask();
  const [sortBy, setSortBy] = useState('dueDate'); // Default sorting by due date
  const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order

  const handleSortChange = (event) => {
    const selectedSortBy = event.target.value;
    // Toggle sorting order if the same sorting option is selected again
    if (selectedSortBy === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(selectedSortBy);
      setSortOrder('asc'); // Reset sorting order to ascending when a new option is selected
    }
  };

  // Sort tasks based on the selected sorting option and order
  const sortedTasks = tasks.slice().sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'dueDate') {
      comparison = new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === 'priority') {
      comparison = a.priority - b.priority;
    } else if (sortBy === 'status') {
      comparison = a.status.localeCompare(b.status);
    }

    // Apply sorting order
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleProgressUpdate = (taskId, newStatus) => {
    updateTaskStatus(taskId, newStatus);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Task Tray</h2>
        <div className="mb-4">
          <label className="mr-2">Sort by:</label>
          <select
            onChange={handleSortChange}
            value={sortBy}
            className="p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </div>
        <ul>
          {sortedTasks.map((task) => (
            <li
              key={task.id}
              className="mb-6 p-4 bg-gray-200 rounded-lg shadow-md"
            >
              <div className="mb-2">
                <strong className="text-lg font-semibold">Title:</strong>{' '}
                {task.title}
              </div>
              <div className="mb-2">
                <strong>Description:</strong> {task.description}
              </div>
              <div className="mb-2">
                <strong>Due Date:</strong> {task.dueDate}
              </div>
              <div className="mb-2">
                <strong>Priority:</strong> {task.priority}
              </div>
              <div className="mb-2">
                <strong>Status:</strong> {task.status}
              </div>
              <div className="mb-2">
                <strong>Assigned To:</strong> {task.assignedTo}
              </div>
              <div className="mb-2">
                <strong>Assigned Team:</strong> {task.assignedTeam}
              </div>
              <div className="mb-2">
                <strong>Progress:</strong> {task.progress}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleProgressUpdate(task.id, 'In Progress')}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                >
                  Start Progress
                </button>
                <button
                  onClick={() => handleProgressUpdate(task.id, 'Completed')}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-400"
                >
                  Complete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskTray;
