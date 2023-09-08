import React from 'react';
import { useAuth } from '../../Contexts/AuthContext'

function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
        {/* Profile Picture */}
        <div className="mb-4">
          <img
            src={user.picture}
            alt={`${user.username}'s Profile Picture`}
            className="w-45 h-40 rounded-full mx-auto "
          />
        </div>

        {/* Username */}
        <h2 className="text-2xl font-semibold text-center">Username: {user.username}</h2>

        {/* Bio */}
        <p className="text-gray-600 text-center mt-2">Bio: {user.bio}</p>

      </div>
    </div>
  );
}

export default Profile;
