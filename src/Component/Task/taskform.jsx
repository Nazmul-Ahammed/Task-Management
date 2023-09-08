import React, { useState, useEffect } from 'react';
import { useTask } from '../../Contexts/TaskContext';
import { useTeam } from '../../Contexts/TeamContext';
import { useAuth } from '../../Contexts/AuthContext';
import localforage from 'localforage';

function TaskForm() {
  const { createTask } = useTask();
  const { existingTeams } = useTeam();
  const { user } = useAuth();
  const [userTeams, setUserTeams] = useState([]);

  useEffect(() => {
    const fetchUserTeams = async () => {
      try {
        const teams = [];

        for (const teamName of existingTeams) {
          const teamData = await localforage.getItem(`team_${teamName}`);

          if (teamData && teamData.members) {
            const isUserMember = teamData.members.some(
              (member) => member && member.username === user?.username
            );

            if (isUserMember) {
              teams.push(teamName);
            }
          }
        }

        setUserTeams(teams);
      } catch (error) {
        console.error('Error fetching user teams:', error);
      }
    };

    if (user && existingTeams.length) {
      fetchUserTeams();
    }
  }, [existingTeams, user]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    assignedTo: '',
    assignedTeam: '', // Add a new property for assigned team
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask({ ...newTask, id: Date.now(), status: 'Not Started' });
    // Clear the form fields or redirect to the task list
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create a New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={newTask.title}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              value={newTask.description}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date:
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              placeholder="Due Date"
              value={newTask.dueDate}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority:
            </label>
            <select
              id="priority"
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="assignedTeam" className="block text-sm font-medium text-gray-700">
              Assigned Team:
            </label>
            <select
              id="assignedTeam"
              name="assignedTeam"
              value={newTask.assignedTeam}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            >
              <option value="">Select Team</option>
              {userTeams.map((teamName) => (
                <option key={teamName} value={teamName}>
                  {teamName}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
