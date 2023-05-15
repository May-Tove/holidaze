import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLogin } from '../../context/LoginProvider';
import useApi from '../../hooks/useApi';
import { MyVenues, Bookings, Reservations } from '../../components/Profile';
import avatarPlaceholder from '../../assets/avatar-placeholder.png';
import UpdateAvatar from '../../components/Profile/Update';

export const Profile = () => {
  const { name } = useParams();
  const [selectedTab, setSelectedTab] = useState('venues');
  const [showUpdateAvatarModal, setShowUpdateAvatarModal] = useState(false);

  const { isLoggedIn, token, avatar } = useLogin();

  const { data, isLoading, isError } = useApi(
    `https://api.noroff.dev/api/v1/holidaze/profiles/${name}?_bookings=true&_venues=true`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(data);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const { bookings, email, venueManager, venues } = data;

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleUpdateAvatarButtonClick = () => {
    setShowUpdateAvatarModal(true);
  };

  const handleCloseModal = () => {
    setShowUpdateAvatarModal(false);
  };

  const renderContent = () => {
    if (selectedTab === 'venues') {
      return <MyVenues venues={venues} />;
    } else if (selectedTab === 'reservation') {
      return <Reservations token={token} name={name} />;
    } else if (selectedTab === 'bookings') {
      return <Bookings bookings={bookings} />;
    }
  };
  return (
    <main className="w-5/6 m-auto lg:w-4/5 py-40">
      <div>
        {isLoggedIn && (
          <>
            <div className="flex flex-col text-center items-center gap-5 m-auto mb-10">
              <img
                className="w-[200px] h-[200px] object-cover rounded-full"
                src={avatar}
                alt={`Profile avatar of ${name}`}
                onError={(e) => {
                  e.target.src = avatarPlaceholder;
                }}
              />

              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold font-serif">{name}</h1>
                <p>{email}</p>
                <button className="btn" onClick={handleUpdateAvatarButtonClick}>
                  Change avatar
                </button>
              </div>
            </div>
            {showUpdateAvatarModal && (
              <UpdateAvatar
                profile={data}
                handleClose={handleCloseModal}
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
                    className={`inline-flex p-4 border-b-2 ${
                      selectedTab === 'venues'
                        ? 'border-secondary text-secondary '
                        : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
                    }  `}
                  >
                    Venues
                  </button>

                  <button
                    onClick={() => handleTabClick('reservation')}
                    className={`inline-flex p-4 border-b-2 ${
                      selectedTab === 'reservation'
                        ? 'border-secondary text-secondary '
                        : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
                    } `}
                  >
                    Reservations
                  </button>

                  <button
                    onClick={() => handleTabClick('bookings')}
                    className={`inline-flex p-4 border-b-2 ${
                      selectedTab === 'bookings'
                        ? 'border-secondary text-secondary '
                        : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
                    } `}
                  >
                    Bookings
                  </button>
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
