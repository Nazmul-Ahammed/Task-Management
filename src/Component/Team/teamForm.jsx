import React from 'react';
import { useTeam, TeamProvider } from '../../Contexts/TeamContext' // Adjust the path to the actual path
import { useAuth } from '../../Contexts/AuthContext';
function TeamCreationForm() {
  const {
    teamName,
    setTeamName,
    allUsers,
    handleAddUserToTeam,
    teamMembers,
    handleCreateTeam,
  } = useTeam();

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label>
          Team Name:
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Team Name"
          />
        </label>
      </div>

      <div>
            {allUsers && allUsers.length > 0 && allUsers.map((user) => (
                user && user.username &&
                <div key={user.username}>
                <label>
                    <input
                    type="checkbox"
                    value={user.username}
                    checked={teamMembers.some((member) => member && member.username === user.username)}
                    onChange={() => handleAddUserToTeam(user.username)}
                    />
                    {user.username}
                </label>
                </div>
            ))}
</div>


      <div>
        <button type="button" onClick={handleCreateTeam}>
          Create Team
        </button>
      </div>
    </form>
  );
}

export default TeamCreationForm;
