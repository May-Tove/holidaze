import React from 'react';
import PropTypes from 'prop-types';
import useApi from '../../../hooks/useApi';

export const Reservations = ({ token, name }) => {
  const { data } = useApi(
    `https://api.noroff.dev/api/v1/holidaze/profiles/${name}/venues?_bookings=true`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (
    <>
      <h2 className="text-xl font-serif font-bold mb-4">
        Reservation overview ({data.length})
      </h2>
      {data && data.length > 0 ? (
        <div className="flex flex-col">
          <div className="grid grid-cols-6 gap-5 font-bold mb-5">
            <span>Arrival</span>
            <span>Departure</span>
            <span>Guests</span>
            <span>Created</span>
            <span>Venue</span>
          </div>
          {data.map((venue) => (
            <div key={venue.id} className="flex flex-col gap-3 ">
              {venue.bookings.map((booking, index) => (
                <div key={index} className="grid grid-cols-6 gap-5 py-2">
                  <span>{new Date(booking.dateFrom).toLocaleDateString()}</span>
                  <span>{new Date(booking.dateTo).toLocaleDateString()}</span>
                  <span>{booking.guests}</span>
                  <span>{new Date(booking.created).toLocaleDateString()}</span>
                  <span>{venue?.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div>No upcoming reservations</div>
      )}
    </>
  );
};

Reservations.propTypes = {
  token: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

/*
                <div className="w-20 h-20">
                   {venue?.media && (
                     <img
                       className="w-full h-full object-cover"
                       src={venue.media[0]}
                       alt={venue.name}
                     />
                   )}
                 </div>*/
