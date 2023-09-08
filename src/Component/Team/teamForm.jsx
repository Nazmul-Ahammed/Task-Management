import React from 'react';
import { useTeam } from '../../Contexts/TeamContext';
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

  const { user } = useAuth();

  return (
    <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label className="block font-semibold mb-2">Team Name:</label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Team Name"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Add Team Members:</label>
        {allUsers &&
          allUsers.length > 0 &&
          allUsers.map((user) => (
            user && user.username && (
              <div key={user.username} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={user.username}
                  checked={teamMembers.some(
                    (current) =>
                      current && current.username === user.username
                  )}
                  onChange={() => handleAddUserToTeam(user.username)}
                  className="mr-2"
                />
                <span>{user.username}</span>
              </div>
            )
          ))}
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleCreateTeam}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Team
        </button>
      </div>
    </form>
  );
}

export default TeamCreationForm;
