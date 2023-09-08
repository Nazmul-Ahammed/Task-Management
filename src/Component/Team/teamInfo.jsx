import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import { useAuth } from '../../Contexts/AuthContext';
import { useTeam } from '../../Contexts/TeamContext';

function UserTeams() {
  const { user } = useAuth();
  const { existingTeams } = useTeam();
  const [userTeams, setUserTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null); // Track the selected team
  const [teamMembers, setTeamMembers] = useState([]);
  const [existingMembers, setExistingMembers] = useState([]); // Store all existing members

  useEffect(() => {
    const fetchUserTeams = async () => {
      try {
        const teams = [];
  
        for (const teamName of existingTeams) {
          const teamData = await localforage.getItem(`team_${teamName}`);
  
          if (teamData && teamData.members) {
            const isUserMember = teamData.members.some(
              (member) => member && member.username && member.username === user?.username
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
  
    const fetchExistingMembers = async () => {
      try {
        const keys = await localforage.keys();
        const members = [];
  
        for (const key of keys) {
          if (key !== 'user' && !key.startsWith('team_')) {
            const memberData = await localforage.getItem(key);
            if (memberData) {
              members.push(memberData);
            }
          }
        }
  
        setExistingMembers(members);
      } catch (error) {
        console.error('Error fetching existing members:', error);
      }
    };
  
    if (user && existingTeams.length) {
      fetchUserTeams();
      fetchExistingMembers(); // Fetch all existing members
    }
  }, [existingTeams, user]);

  // Function to load team members when a team is selected
  const loadTeamMembers = async (teamName) => {
    try {
      const teamData = await localforage.getItem(`team_${teamName}`);
      if (teamData && teamData.members) {
        setTeamMembers(teamData.members);
      }
    } catch (error) {
      console.error('Error loading team members:', error);
    }
  };

  // Handle clicking on a team name
  const handleTeamClick = (teamName) => {
    setSelectedTeam(teamName);
    loadTeamMembers(teamName);
  };

  // Function to add a member to the team
  const addMemberToTeam = async (member) => {
    try {
      const teamData = await localforage.getItem(`team_${selectedTeam}`);
      if (teamData) {
        const updatedMembers = [...teamData.members, member];
        await localforage.setItem(`team_${selectedTeam}`, {
          ...teamData,
          members: updatedMembers,
        });
        loadTeamMembers(selectedTeam);
      }
    } catch (error) {
      console.error('Error adding member to the team:', error);
    }
  };

  // Function to delete a member from the team
  const deleteMemberFromTeam = async (username) => {
    try {
      const teamData = await localforage.getItem(`team_${selectedTeam}`);
      if (teamData) {
        const updatedMembers = teamData.members.filter(
          (member) => member && member.username && member.username !== username
        );
        await localforage.setItem(`team_${selectedTeam}`, {
          ...teamData,
          members: updatedMembers,
        });
        loadTeamMembers(selectedTeam);
      }
    } catch (error) {
      console.error('Error deleting member from the team:', error);
    }
  };

  // Filter out existing members who are not in the team
  const filteredExistingMembers = existingMembers.filter(
    (member) =>
      member && member.username && 
      !teamMembers.some(
        (teamMember) => teamMember && teamMember.username && teamMember.username === member.username
      )
  );
return (
  <div className="min-h-screen bg-gray-100 py-8">
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <button
        onClick={() => handleTeamClick(null)} // Set selectedTeam to null when clicking the "Your Teams" button
        className="text-2xl font-semibold mb-4 block w-full text-left p-2 cursor-pointer focus:outline-none hover:bg-gray-100"
      >
        Your Teams <br /><br />
        <p className='text-xl text-red-700'>Click on the team name to add or remove user</p>
      </button>
      <ul className="mb-4">
        {userTeams.map((teamName, index) => (
            <div>
          <button
            key={index}
            onClick={() => handleTeamClick(teamName)}
            className={`cursor-pointer block w-[80px] rounded-xl bg-green-400 text-left p-2 ${
              selectedTeam === teamName
                ? 'bg-blue-200 text-blue-500'
                : 'hover:bg-gray-100'
            }`}
          >
            {teamName}
          </button>
          <br />
          </div>
         
        ))}
      </ul>
      <br />
      {selectedTeam && (
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Team Members ({selectedTeam})
          </h3>
          {teamMembers.length ? (
            <ul className="mb-4">
              {teamMembers.map((member, index) => (
                <li key={index} className="flex justify-between items-center">
                  {member.username}
                  <button
                    onClick={() => deleteMemberFromTeam(member.username)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No team members found.</p>
          )}

          {/* Add New Member */}
          <h3 className="text-lg font-semibold mb-2">Add New Member</h3>
          <select
            onChange={(e) =>
              addMemberToTeam(
                filteredExistingMembers.find(
                  (member) => member.username === e.target.value
                )
              )
            }
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Member</option>
            {filteredExistingMembers.map((member, index) => (
              <option key={index} value={member.username}>
                {member.username}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  </div>
);
}

export default UserTeams;
