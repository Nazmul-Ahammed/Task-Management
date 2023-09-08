import React, { createContext, useContext, useState, useEffect } from 'react';
import localforage from 'localforage';
import { useAuth } from './AuthContext'

const TeamContext = createContext();


export function useTeam() {
  return useContext(TeamContext);
}

export function TeamProvider({ children }) {
  const {user} = useAuth()
  const [userTeams, setUserTeams] = useState([]);

  const [teamMembers, setTeamMembers] = useState([user]);
  const [teamName, setTeamName] = useState('');
  const [usernamesToAdd, setUsernamesToAdd] = useState('');
  const [existingTeams, setExistingTeams] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [selectedTeamName, setSelectedTeamName] = useState('');

  useEffect(() => {
    // Fetch all users from LocalForage when the component mounts
    const fetchAllUsers = async () => {
      try {
        const keys = await localforage.keys();
        const users = [];

        for (const key of keys) {
          if (key !== 'user') {
            const userData = await localforage.getItem(key);
            if (userData) {
              users.push(userData);
            }
          }
        }

        setAllUsers(users);
      } catch (error) {
        console.error('Error fetching all users:', error);
      }
    };

    const fetchExistingTeams = async () => {
      try {
        const keys = await localforage.keys();
        const teams = keys.filter((key) => key.startsWith('team_'));
        setExistingTeams(teams.map((team) => team.substr(5)));
      } catch (error) {
        console.error('Error fetching existing teams:', error);
      }
    };

    fetchAllUsers();
    fetchExistingTeams();
  }, []);

  const handleCreateTeam = async () => {
    if (existingTeams.includes(teamName)) {
      console.log(`Team ${teamName} already exists.`);
      return;
    }
  
    const newTeam = {
      teamName,
      members: teamMembers,
    };
  
    try {
      await localforage.setItem(`team_${teamName}`, newTeam);
      console.log(`Team ${teamName} created.`, newTeam);
      setExistingTeams([...existingTeams, teamName]);
      setTeamName('');
      setTeamMembers([user]); // Resetting to the logged in user
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };
  

  const handleAddUserToTeam = (username) => {
    const existingUser = allUsers.find((user) => user.username === username);
    
    if (existingUser) {
      setTeamMembers((prevMembers) => {
        const isAlreadyMember = prevMembers.some((member) => member.username === username);
        if (isAlreadyMember) {
          return prevMembers.filter((member) => member.username !== username);
        } else {
          return [...prevMembers, existingUser];
        }
      });
    }
  };
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
  

  return (
    <TeamContext.Provider
      value={{
        teamName,
        setTeamName,
        usernamesToAdd,
        setUsernamesToAdd,
        teamMembers,
        setTeamMembers,
        existingTeams,
        allUsers,
        handleCreateTeam,
        handleAddUserToTeam,
        userTeams,
        
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}
