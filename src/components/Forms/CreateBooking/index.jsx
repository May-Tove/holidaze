import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { DateRange } from 'react-date-range';
import { eachDayOfInterval, format, parseISO } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import useApi from '../../../hooks/useApi';
import useToggle from '../../../hooks/useToggle';
import useDisableCalendarDates from '../../../hooks/useDisableCalendarDates';
import ErrorMessage from '../../../shared/errorMessage';
import BookingConfirmation from '../../BookingConfirmation';
import { API_BOOKINGS_URL } from '../../../shared';
import {
  calculateNights,
  calculateTotalPrice,
} from '../../../utilities/calendarCalculation';

/**
 * A component that allows users to create a booking for a venue.
 * @param {Object} props - The props object.
 * @param {Array} props.bookings - An array of existing bookings for the venue.
 * @param {Object} props.venue - An object representing the venue being booked.
 * @param {string} props.id - The ID of the venue being booked.
 * @param {boolean} props.isLoggedIn - A boolean indicating whether the user is logged in.
 * @param {string} props.price - The price per night for the venue.
 * @returns {JSX.Element} - A JSX element representing the CreateBooking component.
 */
export const CreateBooking = ({ venue, bookings, id, isLoggedIn, price }) => {
  const [responseData, setResponseData] = useState(null);
  const [isConfirmationOpen, toggleConfirmation] = useToggle();
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [nightsCount, setNightsCount] = useState(0);

  const { disabledDates, setDisabledDates } = useDisableCalendarDates({
    bookings,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { fetchApi, isLoading, isError, errorMessage } = useApi();

  // Calculate number of nights and total price for the selected dates in the date range picker
  const calculateBookingDetails = () => {
    if (range[0]) {
      const nights = calculateNights(range[0].startDate, range[0].endDate);
      const total = calculateTotalPrice(nights, price);
      setNightsCount(nights);
      setTotalPrice(total);
    }
  };

  useEffect(() => {
    calculateBookingDetails();
  }, [range, price]);

  const onSubmit = async (formData) => {
    const parsedGuests = parseInt(formData.guests);

    const response = await fetchApi(API_BOOKINGS_URL, 'post', {
      dateFrom: range[0].startDate.toISOString(),
      dateTo: range[0].endDate.toISOString(),
      guests: parsedGuests,
      venueId: id,
    });

    setResponseData(response.data);
    toggleConfirmation();

    const { dateFrom, dateTo } = response.data;
    const newBookingDates = eachDayOfInterval({
      start: parseISO(dateFrom),
      end: parseISO(dateTo),
    });

    // Update the disabled dates with the new booked dates
    setDisabledDates((prevDisabledDates) => [
      ...prevDisabledDates,
      ...newBookingDates,
    ]);

    reset();
  };

  const handleResetRange = () => {
    //Close the confirmation modal
    toggleConfirmation();

    //Reset the date range to initial range after closing the confirmation modal
    setRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
    ]);
  };

  // Booking Confirmation
  if (isConfirmationOpen) {
    return (
      <BookingConfirmation
        handleCloseBookingConfirmation={handleResetRange}
        responseData={responseData}
        nightsCount={nightsCount}
        totalPrice={totalPrice}
        venue={venue}
      />
    );
  }

  return (
    <section className="w-full">
      <form
        className="flex flex-col gap-3 mt-3 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="calendarWrap" data-testid="venue-calendar">
          <DateRange
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calendarElement w-full"
            disabledDates={disabledDates}
            minDate={new Date()}
            rangeColors={['#000']}
          />
        </div>
        <div className="flex gap-3 mt-3">
          <div className="relative w-full">
            <input
              className="floating-input peer cursor-not-allowed w-full"
              id="startDate"
              value={format(range[0].startDate, 'dd.MM.yyyy')}
              placeholder=" "
              readOnly
              aria-label="Input filed showing selected check in date from the calendar."
            />
            <label className="floating-label" htmlFor="startDate">
              Check in
            </label>
          </div>
          <div className="relative w-full">
            <input
              className="floating-input peer cursor-not-allowed"
              id="endDate"
              value={format(range[0].endDate, 'dd.MM.yyyy')}
              placeholder=" "
              readOnly
              aria-label="Input filed showing selected check out date from the calendar."
            />
            <label className="floating-label" htmlFor="endDate">
              Check out
            </label>
          </div>
        </div>
        <div className="relative">
          <input
            className="floating-input peer"
            type="number"
            id="guests"
            min={1}
            placeholder=" "
            {...register('guests', {
              required: true,
            })}
          />
          <label className="floating-label" htmlFor="guests">
            Guests
          </label>
        </div>
        {errors.guests && (
          <span className="text-red-600 text-sm">
            Please fill in how many guests you would like to book for
          </span>
        )}

        {isLoggedIn ? (
          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? 'Booking...' : 'Book'}
          </button>
        ) : (
          <button className="btn opacity-50 cursor-not-allowed" disabled>
            Log in to book
          </button>
        )}
        {isError && <ErrorMessage message={errorMessage} />}
      </form>

      <div className="flex flex-col gap-5 pt-5 mt-5">
        <div className="flex items-center justify-between">
          <span className="text-lightGrey">Price per night</span>
          <span className="font-medium">{price}</span>
        </div>
        <div className="flex items-center justify-between border-b pb-5">
          <span className="text-lightGrey">Number of nights</span>
          <span className="font-medium">{nightsCount}</span>
        </div>
        <div className="flex items-center justify-between font-bold">
          <span className="text-slate-600">Total price</span>
          <span className="text-blue-400">{`$${totalPrice}`}</span>
        </div>
      </div>
    </section>
  );
};

CreateBooking.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      dateFrom: PropTypes.string.isRequired,
      dateTo: PropTypes.string.isRequired,
      guests: PropTypes.number.isRequired,
      created: PropTypes.string.isRequired,
      updated: PropTypes.string.isRequired,
    })
  ),
  venue: PropTypes.shape({
    media: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  price: PropTypes.string.isRequired,
};
