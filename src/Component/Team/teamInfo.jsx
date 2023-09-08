import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import { useAuth } from '../../Contexts/AuthContext'
import { useTeam } from '../../Contexts/TeamContext'

function UserTeams() {
  const { user } = useAuth();
  console.log(user.username)
  const { existingTeams } = useTeam();
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
  
  

  return (
    <div>
      <h2>Your Teams</h2>
      {userTeams.length ? (
        <ul>
          {userTeams.map((teamName, index) => (
            <li key={index}>{teamName}</li>
          ))}
        </ul>
      ) : (
        <p>You are not part of any teams.</p>
      )}
    </div>
  );
}

export default UserTeams;