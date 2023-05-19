import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLogin } from '../../context/LoginProvider';
import useToggle from '../../hooks/useToggle';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import {
  ProfileVenues,
  Bookings,
  Reservations,
} from '../../components/Profile';
import UpdateAvatar from '../../components/Forms/UpdateAvatar';
import { API_PROFILE_URL, handleErrorImage } from '../../shared';
import { TbDiscountCheckFilled, TbPhotoEdit } from 'react-icons/tb';
import ProfileLoader from '../../components/Loaders/ProfileLoader';

export const Profile = () => {
  const { name } = useParams();
  const [selectedTab, setSelectedTab] = useState('venues');
  const [isUpdateAvatarOpen, toggleUpdateAvatar] = useToggle();

  const { isLoggedIn, token, avatar, profile } = useLogin();

  const { data, isLoading, isError } = useAxiosFetch(
    `${API_PROFILE_URL}/${name}?_bookings=true&_venues=true`
  );

  if (isLoading) {
    return <ProfileLoader />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const { bookings, email, venueManager, venues } = data;
  const isLoggedInVenueManager = profile.name === name;

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const renderContent = () => {
    if (selectedTab === 'venues') {
      return (
        <ProfileVenues venues={venues} isOwnProfile={isLoggedInVenueManager} />
      );
    } else if (selectedTab === 'reservation') {
      return <Reservations name={name} />;
    } else if (selectedTab === 'bookings') {
      return <Bookings bookings={bookings} />;
    }
  };
  return (
    <main className="main-layout">
      <div>
        {isLoggedIn && (
          <>
            <div className="flex flex-col text-center items-center gap-3 m-auto mb-10">
              <div className="relative">
                <img
                  className="w-[200px] h-[200px] rounded-full shadow shadow-primaryLight"
                  src={isLoggedInVenueManager ? avatar : data.avatar}
                  alt={`Profile avatar of ${name}`}
                  onError={handleErrorImage}
                />
                {isLoggedInVenueManager && (
                  <button
                    className="p-2 rounded-full bg-primaryLight text-primaryDark absolute bottom-2 right-2 shadow"
                    onClick={toggleUpdateAvatar}
                  >
                    <TbPhotoEdit size={25} />
                  </button>
                )}
              </div>

              <div className="flex flex-col items-center gap-1">
                <h1>{name}</h1>
                {venueManager && (
                  <div className="flex items-center gap-1">
                    <TbDiscountCheckFilled
                      className="text-blue-400"
                      size={20}
                    />
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
                  {isLoggedInVenueManager && (
                    <>
                      <button
                        onClick={() => handleTabClick('reservation')}
                        className={`p-4 border-b-2 ${
                          selectedTab === 'reservation'
                            ? 'border-primaryDark text-primaryDark '
                            : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
                        } `}
                      >
                        Reservations
                      </button>

                      <button
                        onClick={() => handleTabClick('bookings')}
                        className={`p-4 border-b-2 ${
                          selectedTab === 'bookings'
                            ? 'border-primaryDark text-primaryDark '
                            : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
                        } `}
                      >
                        Bookings
                      </button>
                    </>
                  )}
                </div>
                <section className="my-10">{renderContent()}</section>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};
