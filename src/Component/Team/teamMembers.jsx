// AddTeamMembers.js
import React, { useState } from 'react';
import { useTeam } from '../../Contexts/TeamContext'

function AddTeamMembers() {
  const { teamName, allUsers, teamMembers, handleAddUserToTeam } = useTeam();
  const [selectedUser, setSelectedUser] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleAddMember = () => {
    if (!selectedUser) {
      setAlertMessage('Please select a user to add.');
      return;
    }

    if (teamMembers.some((member) => member.username === selectedUser)) {
      setAlertMessage(`User '${selectedUser}' is already in the team.`);
      return;
    }

    handleAddUserToTeam(selectedUser);
    setAlertMessage(`User '${selectedUser}' added to the team.`);
    setSelectedUser('');
  };

  return (
    <div>
      <h2>Add Team Members</h2>
      <div>
        <label>Team Name:</label>
        <input type="text" value={teamName} disabled />
      </div>
      <div>
        <label>Select Member to Add:</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select a user</option>
          {allUsers.map((user) => (
            <option key={user.username} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
      {alertMessage && <div className="alert">{alertMessage}</div>}
      <button onClick={handleAddMember}>Add Member</button>
    </div>
  );
}

export default AddTeamMembers;
