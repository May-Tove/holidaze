import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { DateRange } from 'react-date-range';
import { eachDayOfInterval, format, parseISO } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { CgClose } from 'react-icons/cg';
import useToggle from '../../../hooks/useToggle';
import { API_BOOKINGS_URL } from '../../../shared';
import ErrorMessage from '../../../shared/errorMessage';
import useMethodApi from '../../../hooks/useMethodApi';

export const CreateBooking = ({ bookings, id, isLoggedIn, price }) => {
  const [disabledDates, setDisabledDates] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useToggle();
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const disabledDatesArray =
      (bookings &&
        bookings.flatMap((booking) => {
          try {
            const startDate = parseISO(booking.dateFrom);
            const endDate = parseISO(booking.dateTo);
            const datesBetween = eachDayOfInterval({
              start: startDate,
              end: endDate,
            });
            return datesBetween;
          } catch (error) {
            console.error(`Error processing booking dates: ${error}`);
            return [];
          }
        })) ||
      [];

    setDisabledDates(disabledDatesArray);
  }, [bookings]);

  const { fetchWithMethod, isLoading, isError, errorMessage } = useMethodApi();

  const onSubmit = async (formData) => {
    range.map((value) => {
      const updatedFormData = {
        ...formData,
        dateFrom: value.startDate.toISOString(),
        dateTo: value.endDate.toISOString(),
      };
      return Object.assign(formData, updatedFormData);
    });

    const parsedGuests = parseInt(formData.guests);

    const response = await fetchWithMethod(API_BOOKINGS_URL, 'post', {
      dateFrom: formData.dateFrom,
      dateTo: formData.dateTo,
      guests: parsedGuests,
      venueId: id,
    });

    setResponseData(response.data);

    const { dateFrom, dateTo } = response.data;
    const newBookingDates = eachDayOfInterval({
      start: parseISO(dateFrom),
      end: parseISO(dateTo),
    });

    const newDisabledDates = [...disabledDates, ...newBookingDates];

    setDisabledDates(newDisabledDates);
    setShowConfirmation(true);
    reset();
  };

  const handleCloseBookingConfirmation = () => {
    setShowConfirmation(false);
    setRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
    ]);
  };

  // Booking Confirmation
  if (showConfirmation) {
    const { dateFrom, dateTo, guests } = responseData;

    return (
      <div className="modal">
        <div className="relative modalBody">
          <button
            className="absolute top-2 right-2 iconBtn"
            onClick={handleCloseBookingConfirmation}
          >
            <CgClose size={20} />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="space-y-5 text-center py-5">
            <div className="border-b pb-5">
              <h3>Your booking is confirmed</h3>
              <p>Thank you for booking with Holidaze!</p>
            </div>

            <div className="flex flex-col gap-1">
              <p>Arrival</p>
              <p className=" text-gray-500">
                {format(new Date(dateFrom), 'dd/MM/yyyy')}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p>Departure</p>
              <p className=" text-gray-500">
                {format(new Date(dateTo), 'dd/MM/yyyy')}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p>Guests</p>
              <p className="text-gray-500">{guests}</p>
            </div>
            <p className="text-gray-500 border-t pt-6">
              More details about your reservation can be found in your profile
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full sm:w-[320px]">
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
            rangeColors={['#4C8185']}
          />
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
          <span className="text-red-600 text-sm">This field is required</span>
        )}
        <div>Price per night: {price}</div>
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
    </section>
  );
};

CreateBooking.defaultProps = {
  bookings: [],
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
  ).isRequired,
  id: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  price: PropTypes.string.isRequired,
};
