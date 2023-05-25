import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO, eachDayOfInterval } from 'date-fns';
import useApi from '../../../hooks/useApi';
import { API_PROFILE_URL } from '../../../shared';
import formatCurrency from '../../../shared/formatCurrency';
import ErrorMessage from '../../../shared/errorMessage';

export const Reservations = ({ name }) => {
  const [statusFilter, setStatusFilter] = useState('confirmed');
  const [activeAccordion, setActiveAccordion] = useState(null);
  const { fetchApi, data, isLoading, isError, errorMessage } = useApi();

  const fetchData = useCallback(async () => {
    await fetchApi(`${API_PROFILE_URL}/${name}/venues?_bookings=true`);
  }, [name]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <ErrorMessage message={errorMessage} />;
  }

  const currentDate = new Date();

  // Flatten the array of venues and their bookings
  const reservations = data.flatMap((venue) => {
    return venue.bookings.map((booking) => {
      return {
        ...booking,
        venueName: venue.name,
        venuePrice: venue.price,
        venueMedia: venue.media,
      };
    });
  });

  // Sort the filtered bookings by the arrival date closest to today
  const sortedReservations = reservations.sort((a, b) => {
    const dateA = new Date(a.dateFrom);
    const dateB = new Date(b.dateFrom);
    return Math.abs(dateA - currentDate) - Math.abs(dateB - currentDate);
  });

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const filteredReservations = sortedReservations.filter((booking) => {
    const venueName = booking.venueName;
    if (statusFilter === 'confirmed') {
      return (
        venueName === data[activeAccordion]?.name &&
        parseISO(booking.dateFrom) > currentDate
      );
    } else if (statusFilter === 'staying') {
      return (
        venueName === data[activeAccordion]?.name &&
        parseISO(booking.dateFrom) <= currentDate &&
        parseISO(booking.dateTo) > currentDate
      );
    } else if (statusFilter === 'checkedOut') {
      return (
        venueName === data[activeAccordion]?.name &&
        parseISO(booking.dateTo) <= currentDate
      );
    }
    return venueName === data[activeAccordion]?.name;
  });

  const calculateNumberOfNights = (dateFrom, dateTo) => {
    const startDate = parseISO(dateFrom);
    const endDate = parseISO(dateTo);
    const datesBetween = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });
    return datesBetween.length - 1; // Exclude the arrival day
  };

  const calculateTotalPrice = (booking) => {
    const pricePerNight = booking.venuePrice;
    const numberOfNights = calculateNumberOfNights(
      booking.dateFrom,
      booking.dateTo
    );
    const totalPrice = pricePerNight * numberOfNights;
    const formatTotalPrice = formatCurrency(totalPrice);
    return formatTotalPrice;
  };

  const getStatus = (reservation) => {
    const now = new Date();
    const dateFrom = new Date(reservation.dateFrom);
    const dateTo = new Date(reservation.dateTo);

    if (now < dateFrom) return 'Confirmed';
    if (now >= dateFrom && now < dateTo) return 'Staying';
    if (now >= dateTo) return 'CheckedOut';
  };

  const getStatusCounts = ({ reservations }) => {
    const counts = {
      Confirmed: 0,
      Staying: 0,
      CheckedOut: 0,
    };

    reservations.forEach((reservation) => {
      const status = getStatus(reservation);
      counts[status]++;
    });

    return counts;
  };

  return (
    <>
      <h2 className="mb-4">Reservation overview</h2>
      <div>
        {data.map((venue, i) => (
          <div key={i}>
            <div
              className="flex justify-between items-center cursor-pointer py-2 px-4 border-b"
              onClick={() =>
                setActiveAccordion(i === activeAccordion ? null : i)
              }
            >
              <div className="flex items-center gap-2">
                <img
                  className="w-14 h-14 rounded-lg"
                  src={venue.media[0]}
                  alt=""
                />
                <h3 className="font-bold">{venue.name}</h3>
                <span className="text-xs bg-green-100 text-green-600 py-1 px-3 rounded-full">
                  {
                    getStatusCounts({ reservations: venue.bookings })[
                      'Confirmed'
                    ]
                  }{' '}
                  Arrivals
                </span>
                <span className="text-xs bg-blue-100 text-blue-600 py-1 px-3 rounded-full">
                  {getStatusCounts({ reservations: venue.bookings })['Staying']}{' '}
                  In-House
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 py-1 px-3 rounded-full">
                  {
                    getStatusCounts({ reservations: venue.bookings })[
                      'CheckedOut'
                    ]
                  }{' '}
                  Checked Out
                </span>
              </div>

              <span>{i === activeAccordion ? '-' : '+'}</span>
            </div>
            {i === activeAccordion && (
              <div className="p-4">
                {sortedReservations.length > 0 &&
                filteredReservations.length > 0 ? (
                  <>
                    <p>Filter reservations by status</p>
                    <div className="flex gap-3 my-5">
                      <button
                        onClick={() => handleStatusFilterChange('all')}
                        className={`py-1 px-3 rounded-full ${
                          statusFilter === 'all'
                            ? 'bg-primaryLight text-primaryDark'
                            : ''
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => handleStatusFilterChange('confirmed')}
                        className={`py-1 px-3 rounded-full${
                          statusFilter === 'confirmed'
                            ? 'bg-primaryLight text-primaryDark'
                            : ''
                        }`}
                      >
                        Confirmed
                      </button>
                      <button
                        onClick={() => handleStatusFilterChange('staying')}
                        className={`py-1 px-3 rounded-full
              ${
                statusFilter === 'staying'
                  ? 'bg-primaryLight text-primaryDark'
                  : ''
              }
            `}
                      >
                        Staying
                      </button>
                      <button
                        onClick={() => handleStatusFilterChange('checkedOut')}
                        className={`py-1 px-3 rounded-full
              ${
                statusFilter === 'checkedOut'
                  ? 'bg-primaryLight text-primaryDark'
                  : ''
              }
            `}
                      >
                        Checked Out
                      </button>
                    </div>
                    <div className="flex flex-col">
                      <div className="grid grid-cols-8 gap-5 font-bold mb-3 border-b p-2 bg-gray-200">
                        <span>Arrival</span>
                        <span>Nights</span>
                        <span>Departure</span>
                        <span>Guests</span>
                        <span>Total price</span>
                        <span>Created</span>
                        <span>Status</span>
                      </div>
                      {filteredReservations.map((booking, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-8 gap-5 py-4 border-b px-2"
                        >
                          <span>
                            {format(new Date(booking.dateFrom), 'dd.MM.yyyy')}
                          </span>
                          <span>
                            {calculateNumberOfNights(
                              booking.dateFrom,
                              booking.dateTo
                            )}
                          </span>
                          <span>
                            {format(new Date(booking.dateTo), 'dd.MM.yyyy')}
                          </span>
                          <span>{booking.guests}</span>
                          <span>
                            {' '}
                            {calculateTotalPrice(sortedReservations[i])}
                          </span>
                          <span>
                            {format(new Date(booking.created), 'dd.MM.yyyy')}
                          </span>
                          <span>{getStatus(booking)}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-lightGrey">
                    {sortedReservations.length > 0
                      ? 'No upcoming reservations'
                      : 'No bookings'}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

Reservations.propTypes = {
  name: PropTypes.string.isRequired,
};

/*
  {i === activeAccordion && (
      <div className="p-4">
        {sortedReservations.length > 0 ? (
          <div className="flex flex-col">
            <div className="grid grid-cols-8 gap-5 font-bold mb-5 border-b py-5 bg-gray-200">
              <span>Arrival</span>
              <span>Nights</span>
              <span>Departure</span>
              <span>Guests</span>
              <span>Total price</span>
              <span>Created</span>
              <span>Status</span>
            </div>
            {filteredReservations.map((booking, i) => (
              <div key={i} className="grid grid-cols-8 gap-5 py-4 border-b">
                <span>{format(new Date(booking.dateFrom), 'dd.MM.yyyy')}</span>
                <span>
                  {calculateNumberOfNights(booking.dateFrom, booking.dateTo)}
                </span>
                <span>{format(new Date(booking.dateTo), 'dd.MM.yyyy')}</span>
                <span>{booking.guests}</span>
                <span> {calculateTotalPrice(sortedReservations[i])}</span>
                <span>{format(new Date(booking.created), 'dd.MM.yyyy')}</span>
                <span>{getStatus(booking)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lightGrey">No upcoming reservations</p>
        )}
      </div>
    )}*/

/*
   <h3>Filter reservations by status</h3>
      <div className="flex gap-3 my-5">
        <button
          onClick={() => handleStatusFilterChange('all')}
          className={`py-2 px-4 rounded-full
            ${statusFilter === 'all' ? 'bg-primaryLight text-primaryDark' : ''}
          `}
        >
          All
        </button>
        <button
          onClick={() => handleStatusFilterChange('confirmed')}
          className={`py-2 px-4 rounded-full
            ${
              statusFilter === 'confirmed'
                ? 'bg-primaryLight text-primaryDark'
                : ''
            }
          `}
        >
          Confirmed
        </button>
        <button
          onClick={() => handleStatusFilterChange('staying')}
          className={`py-2 px-4 rounded-full
            ${
              statusFilter === 'staying'
                ? 'bg-primaryLight text-primaryDark'
                : ''
            }
          `}
        >
          Staying
        </button>
        <button
          onClick={() => handleStatusFilterChange('checkedOut')}
          className={`py-2 px-4 rounded-full
            ${
              statusFilter === 'checkedOut'
                ? 'bg-primaryLight text-primaryDark'
                : ''
            }
          `}
        >
          Checked Out
        </button>
      </div>*/

/*export const Reservations = ({ name }) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeIndex, setActiveIndex] = useState(-1);

  const { data, isLoading, isError } = useApi(
    `${API_PROFILE_URL}/${name}/venues?_bookings=true`
  );

  console.log(data);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setActiveIndex(-1);
  };



  const calculateNumberOfNights = (dateFrom, dateTo) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((dateFrom - dateTo) / oneDay));
    return diffDays;
  };

  const calculateTotalPrice = (reservation) => {
    const numberOfNights = calculateNumberOfNights(
      new Date(reservation.dateFrom),
      new Date(reservation.dateTo)
    );
    return numberOfNights * reservation.pricePerNight;
  };

  const sortedReservations = data.sort(
    (a, b) => new Date(b.created) - new Date(a.created)
  );

  const venues = sortedReservations.reduce((acc, reservation) => {
    if (!acc[reservation.venueName]) {
      acc[reservation.venueName] = [];
    }
    acc[reservation.venueName].push(reservation);
    return acc;
  }, {});

  const venueNames = Object.keys(venues);

  return (
    <>
      <h2 className="mb-4">
        Reservation overview ({sortedReservations.length})
      </h2>
      <h3>Filter reservations by status</h3>
      <div className="flex gap-3 my-5">
        <button
          onClick={() => handleStatusFilterChange('all')}
          className={`py-2 px-4 rounded-full
            ${statusFilter === 'all' ? 'bg-primaryLight text-primaryDark' : ''}
          `}
        >
          All
        </button>
        <button
          onClick={() => handleStatusFilterChange('confirmed')}
          className={`py-2 px-4 rounded-full
            ${
              statusFilter === 'confirmed'
                ? 'bg-primaryLight text-primaryDark'
                : ''
            }
          `}
        >
          Confirmed
        </button>
        <button
          onClick={() => handleStatusFilterChange('staying')}
          className={`py-2 px-4 rounded-full
            ${
              statusFilter === 'staying'
                ? 'bg-primaryLight text-primaryDark'
                : ''
            }
          `}
        >
          Staying
        </button>
        <button
          onClick={() => handleStatusFilterChange('checkedOut')}
          className={`py-2 px-4 rounded-full
            ${
              statusFilter === 'checkedOut'
                ? 'bg-primaryLight text-primaryDark'
                : ''
            }
          `}
        >
          Checked Out
        </button>
      </div>
      {sortedReservations.length > 0 ? (
        <div>
          {venueNames.map((venueName) => {
            const venueReservations = venues[venueName].filter(
              (reservation) => {
                if (statusFilter === 'all') return true;
                return getStatus(reservation) === statusFilter;
              }
            );
            const isActive = activeIndex === venueName;

            return (
              <div key={venueName} className="border rounded-md mb-4">
                <button
                  type="button"
                  className={`w-full py-2 px-4 text-left font-bold text-lg
                    ${
                      isActive
                        ? 'bg-primaryLight text-primaryDark'
                        : 'bg-white text-gray-900'
                    }
                  `}
                  onClick={() => setActiveIndex(venueName)}
                >
                  {venueName} ({venueReservations.length})
                </button>
                {isActive && (
                  <div className="border-t p-4">
                    <div className="grid grid-cols-8 text-sm font-medium mb-4">
                      <span>Venue</span>
                      <span>Arrival</span>
                      <span>Nights</span>
                      <span>Departure</span>
                      <span>Guests</span>
                      <span>Total price</span>
                      <span>Created</span>
                      <span>Status</span>
                    </div>
                    <div className="overflow-y-auto h-60">
                      {venueReservations.map((booking, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-8 gap-5 py-4 border-b"
                        >
                          <span className="flex items-center                            gap-2">
                            <img
                              className="h-10 w-10"
                              src={booking?.venueMedia[0]}
                              alt=""
                            />
                            <p>{booking?.venueName}</p>
                          </span>
                          <span>
                            {format(new Date(booking.dateFrom), 'dd.MM.yyyy')}
                          </span>
                          <span>
                            {calculateNumberOfNights(
                              booking.dateFrom,
                              booking.dateTo
                            )}
                          </span>
                          <span>
                            {format(new Date(booking.dateTo), 'dd.MM.yyyy')}
                          </span>
                          <span>{booking.guests}</span>
                          <span>
                            {' '}
                            {calculateTotalPrice(sortedReservations[i])}
                          </span>
                          <span>
                            {format(new Date(booking.created), 'dd.MM.yyyy')}
                          </span>
                          <span>{getStatus(booking)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div>No reservations found</div>
      )}
    </>
  );
};

Reservations.propTypes = {
  name: PropTypes.string.isRequired,
};*/
/*

<div id="accordion-collapse" data-accordion="collapse">
  <h2 id="accordion-collapse-heading-1">
    <button type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 " data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
      <span>What is Flowbite?</span>
  
    </button>
  </h2>
  <div id="accordion-collapse-body-1" class="hidden" aria-labelledby="accordion-collapse-heading-1">
    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
      <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
    </div>
  </div>
 
 
  </div>

*/
