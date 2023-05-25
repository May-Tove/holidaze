import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useLogin } from '../../context/LoginProvider';
import useToggle from '../../hooks/useToggle';
import useApi from '../../hooks/useApi';
import {
  ProfileVenues,
  Bookings,
  VenueReservations,
} from '../../components/Profile';
import UpdateAvatar from '../../components/Forms/UpdateAvatar';
import { API_PROFILE_URL, handleErrorImage } from '../../shared';
import { TbDiscountCheckFilled, TbPhotoEdit } from 'react-icons/tb';
import ProfileLoader from '../../components/Loaders/ProfileLoader';
import Breadcrumbs from '../../components/Breadcrumbs';

export const Profile = () => {
  const { name } = useParams();
  const [selectedTab, setSelectedTab] = useState('venues');
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
    return <div>{errorMessage}</div>;
  }

  const { bookings, email, venueManager, venues } = data;
  const isOwnProfile = profile.name === name;

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const renderContent = () => {
    if (selectedTab === 'venues') {
      return <ProfileVenues venues={venues} isOwnProfile={isOwnProfile} />;
    } else if (selectedTab === 'reservations') {
      return <VenueReservations name={name} />;
    } else if (selectedTab === 'bookings') {
      return <Bookings bookings={bookings} />;
    }
  };
  return (
    <>
      <Helmet>
        <title>{`${name}'s Profile | Holidaze`}</title>
        <meta
          name="description"
          content={
            isOwnProfile
              ? `${
                  venueManager
                    ? 'Manage your venues, track venue reservations, and view your bookings on your Holidaze profile.'
                    : 'Track your bookings on your Holidaze profile.'
                }`
              : `Explore ${name}'s Holidaze profile.`
          }
        />
      </Helmet>
      <main className="main-layout">
        <Breadcrumbs page={name} />
        <div className="flex flex-col text-center items-center gap-3 m-auto mb-10">
          <div className="relative">
            <img
              className="w-[200px] h-[200px] rounded-full shadow shadow-primaryLight"
              src={isOwnProfile ? avatar : data.avatar}
              alt={`Profile avatar of ${name}`}
              onError={handleErrorImage}
            />
            {isOwnProfile && (
              <button
                className="p-2 rounded-full bg-primaryLight text-primaryDark absolute bottom-2 right-2 shadow"
                onClick={toggleUpdateAvatar}
                aria-label="Update avatar button"
              >
                <TbPhotoEdit size={25} />
              </button>
            )}
          </div>

          <div className="flex flex-col items-center gap-1">
            <h1>{name}</h1>
            {venueManager && (
              <div className="flex items-center gap-1">
                <TbDiscountCheckFilled className="text-blue-400" size={20} />
                <p>Venue Manager</p>
              </div>
            )}
            <p className="text-sm text-lightGrey">{email}</p>
          </div>
        </div>
        {isUpdateAvatarOpen && (
          <UpdateAvatar
            profile={data}
            handleClose={toggleUpdateAvatar}
            token={token}
          />
        )}
        {!venueManager && bookings ? (
          <section className="my-20">
            <Bookings bookings={bookings} />
          </section>
        ) : (
          <div>
            <div className="border-b border-gray-300">
              <button
                onClick={() => handleTabClick('venues')}
                className={`p-4 border-b-2 ${
                  selectedTab === 'venues'
                    ? 'border-primaryDark text-primaryDark '
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
                }  `}
              >
                Venues
              </button>
              {isOwnProfile && (
                <>
                  <button
                    onClick={() => handleTabClick('reservations')}
                    className={`p-4 border-b-2 ${
                      selectedTab === 'reservations'
                        ? 'border-primaryDark text-primaryDark '
                        : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
                    } `}
                  >
                    Venue Reservations
                  </button>

                  <button
                    onClick={() => handleTabClick('bookings')}
                    className={`p-4 border-b-2 ${
                      selectedTab === 'bookings'
                        ? 'border-primaryDark text-primaryDark '
                        : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
                    } `}
                  >
                    My Bookings
                  </button>
                </>
              )}
            </div>
            <section className="my-10">{renderContent()}</section>
          </div>
        )}
      </main>
    </>
  );
};
