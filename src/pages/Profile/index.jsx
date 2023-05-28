import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useLogin } from '../../context/LoginProvider';
import useToggle from '../../hooks/useToggle';
import useApi from '../../hooks/useApi';
import UpdateAvatar from '../../components/Forms/UpdateAvatar';
import { API_PROFILE_URL } from '../../shared';
import UserDetails from '../../components/Profile/UserDetails';
import ProfileLoader from '../../components/Loaders/ProfileLoader';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHelmet from '../../components/SEOHelmet';
import RenderTabContent from '../../components/Profile/RenderTabContent';
import ErrorMessage from '../../components/ErrorMessage';

export const Profile = () => {
  const { name } = useParams();

  const [isUpdateAvatarOpen, toggleUpdateAvatar] = useToggle();

  const { token, avatar, profile } = useLogin();

  const { fetchApi, isLoading, isError, errorMessage, data } = useApi();

  const fetchData = useCallback(async () => {
    await fetchApi(`${API_PROFILE_URL}/${name}?_bookings=true&_venues=true`);
  }, [name]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <ProfileLoader />;
  }

  if (isError) {
    return <ErrorMessage message={errorMessage} />;
  }

  const { bookings, email, venueManager, venues } = data;
  const isOwnProfile = profile.name === name;

  return (
    <>
      <SEOHelmet
        title={`${name}'s Profile | Holidaze`}
        description={
          isOwnProfile
            ? `${
                venueManager
                  ? 'Manage your venues, track venue reservations, and view your bookings on your Holidaze profile.'
                  : 'Track your bookings on your Holidaze profile.'
              }`
            : `Explore ${name}'s Holidaze profile.`
        }
      />
      <main className="main-layout">
        <Breadcrumbs page={name} />
        <UserDetails
          name={name}
          email={email}
          avatar={avatar}
          isOwnProfile={isOwnProfile}
          venueManager={venueManager}
          toggleUpdateAvatar={toggleUpdateAvatar}
        />
        {isUpdateAvatarOpen && (
          <UpdateAvatar
            profile={data}
            handleClose={toggleUpdateAvatar}
            token={token}
          />
        )}
        <RenderTabContent
          venues={venues}
          name={name}
          bookings={bookings}
          isOwnProfile={isOwnProfile}
          venueManager={venueManager}
        />
      </main>
    </>
  );
};
