import React from 'react';
import { useLogin } from '../../../context/LoginProvider';

const ProfileDetails = () => {
  const { isLoggedIn, profile } = useLogin();

  return (
    <div>
      {isLoggedIn && (
        <>
          <div className="flex items-center gap-20">
            <img
              className="w-[200px] h-[200px] object-cover rounded-full"
              src={profile.avatar}
              alt=""
            />
            <div className="flex flex-col">
              <h1>{profile.name}</h1>
              <p>{profile.email}</p>
              {profile.venueManager && <p>This user is a venue manager.</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDetails;
