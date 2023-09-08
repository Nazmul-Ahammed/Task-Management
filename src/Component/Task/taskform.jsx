// TaskForm.js
import React, { useState, useEffect } from 'react';
import { useTask } from '../../Contexts/TaskContext';
import { useTeam } from '../../Contexts/TeamContext';
import { useAuth } from '../../Contexts/AuthContext';
import localforage from 'localforage';

function TaskForm() {
  const { createTask } = useTask();
  const { existingTeams } = useTeam();
  const {user}=useAuth()
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
  }, [existingTeams, user]); // Access the existing teams from TeamContext
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
    // Clear the form fields or redirect to task list
  };

  return (
    <div>
      <div>
  <h2>Create a New Task</h2>
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Title"
        value={newTask.title}
        onChange={handleInputChange}
      />
    </div>
    <div>
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        name="description"
        placeholder="Description"
        value={newTask.description}
        onChange={handleInputChange}
      />
    </div>
    <div>
      <label htmlFor="dueDate">Due Date:</label>
      <input
        type="date"
        id="dueDate"
        name="dueDate"
        placeholder="Due Date"
        value={newTask.dueDate}
        onChange={handleInputChange}
      />
    </div>
    <div>
    <label htmlFor="priority">Priority:</label>
      <select
        id="priority"
        name="priority"
        value={newTask.priority}
        onChange={handleInputChange}
      >
        <option value="">Select Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
    {/* Add labels and inputs for other task properties */}
    <div>
      <label htmlFor="assignedTeam">Assigned Team:</label>
      <select
        id="assignedTeam"
        name="assignedTeam"
        value={newTask.assignedTeam}
        onChange={handleInputChange}
      >
        <option value="">Select Team</option>
        {userTeams.map((teamName) => (
          <option key={teamName} value={teamName}>
            {teamName}
          </option>
        ))}
      </select>
    </div>
    <button type="submit">Create Task</button>
  </form>
</div>

    </div>
  );
}

export default TaskForm;
