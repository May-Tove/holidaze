import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { DateRange } from 'react-date-range';
import { eachDayOfInterval, format, parseISO } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { AiOutlineCloseCircle } from 'react-icons/Ai';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useToggle from '../../../hooks/useToggle';
import { API_BOOKINGS_URL } from '../../../shared';
import ErrorMessage from '../../../shared/errorMessage';

export const CreateBooking = ({ bookings, id, isLoggedIn }) => {
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

  const { submit, isLoading, isError, fetchError } = useAxiosFetch();

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

    const response = await submit(API_BOOKINGS_URL, 'post', {
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
      <div
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 z-50 bg-black/50 w-full p-4 overflow-x-hidden overflow-y-auto h-full max-h-full"
      >
        <div className="relative flex justify-center m-auto top-20 lg:top-56 w-full max-w-xl max-h-full">
          <div className="relative w-full  bg-white shadow ">
            <button
              className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5"
              onClick={handleCloseBookingConfirmation}
            >
              <AiOutlineCloseCircle size={30} />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 space-y-6 text-center">
              <div className="border-b pb-6">
                <h3 className="text-2xl font-bold font-serif text-gray-900 mt-10 mb-1">
                  Your booking is confirmed
                </h3>
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
      </div>
    );
  }

  return (
    <section className="w-full sm:w-[320px]">
      <form
        className="flex flex-col gap-3 mt-3 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="calendarWrap">
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
            rangeColors={['#32746D']}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="guests">Guests</label>
          <input
            className="bg-transparent border-2 border-primary p-1"
            type="number"
            id="guests"
            min={1}
            {...register('guests', {
              required: true,
            })}
          />
          {errors.guests && (
            <span className="text-red-600 text-sm mt-1">
              This field is required
            </span>
          )}
        </div>

        {isLoggedIn ? (
          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? 'Booking...' : 'Book'}
          </button>
        ) : (
          <button className="btn opacity-50 cursor-not-allowed" disabled>
            Log in to book
          </button>
        )}
        {isError && <ErrorMessage message={fetchError} />}
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
  id: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
