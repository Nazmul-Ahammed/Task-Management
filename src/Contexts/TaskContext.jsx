import React, { createContext, useContext, useState, useEffect } from 'react';
import localforage from 'localforage';
import { useTeam } from './TeamContext';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export function useTask() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const { userTeams } = useTeam(); // Access teams the user is a member of
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load tasks from LocalForage when the component mounts
    const loadTasksFromLocalForage = async () => {
      try {
        const keys = await localforage.keys(); // Await the keys() promise
        const teamTasksKeys = keys.filter((key) => key.startsWith('team_'));
        const allTeamTasks = [];

        for (const teamTasksKey of teamTasksKeys) {
          const teamTasksData = await localforage.getItem(teamTasksKey);
          if (teamTasksData && Array.isArray(teamTasksData)) { // Ensure it's an array
            allTeamTasks.push(...teamTasksData);
          }
        }

        // Filter tasks based on the teams the user is a member of
        const userTeamTasks = allTeamTasks.filter((task) =>
          userTeams.includes(task.assignedTeam)
        );

        setTasks(userTeamTasks);
      } catch (error) {
        console.error('Error loading tasks from LocalForage:', error);
      }
    };

    loadTasksFromLocalForage();
  }, [userTeams, user]);

  const createTask = (newTask) => {
    // Create a copy of the current tasks array
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);

    // Add the task to the team's task list in LocalForage
    const teamTasksKey = `team_${newTask.assignedTeam}_tasks`;
    localforage
      .getItem(teamTasksKey)
      .then((teamTasksData) => {
        if (teamTasksData && Array.isArray(teamTasksData)) { // Ensure it's an array
          const updatedTeamTasks = [...teamTasksData, newTask];
          localforage.setItem(teamTasksKey, updatedTeamTasks);
        }
      })
      .catch((error) => {
        console.error('Error adding task to team in LocalForage:', error);
      });
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);

    // Update task status in the team's task list in LocalForage
    const teamTasksKey = `team_${updatedTasks[0].assignedTeam}_tasks`; // Assuming all tasks in the filtered list belong to the same team
    localforage
      .getItem(teamTasksKey)
      .then((teamTasksData) => {
        if (teamTasksData && Array.isArray(teamTasksData)) { // Ensure it's an array
          const updatedTeamTasks = teamTasksData.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          );
          localforage.setItem(teamTasksKey, updatedTeamTasks);
        }
      })
      .catch((error) => {
        console.error('Error updating task status in LocalForage:', error);
      });
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
}
