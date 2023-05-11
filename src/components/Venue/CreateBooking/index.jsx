import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DateRange } from 'react-date-range';
import { eachDayOfInterval } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useLogin } from '../../../context/LoginProvider';
import usePostApi from '../../../hooks/usePostApi';
import FormSubmitError from '../../Error/FormError';

const CreateBooking = ({ bookings }) => {
  let { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoggedIn } = useLogin();
  const today = new Date();
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
      color: '#32746D',
    },
  ]);

  const [disabledDates, setDisabledDates] = useState([]);

  const { post, isLoading, isError, errorMessage } = usePostApi();

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

    const response = await post(
      'https://api.noroff.dev/api/v1/holidaze/bookings',
      {
        dateFrom: formData.dateFrom,
        dateTo: formData.dateTo,
        guests: parsedGuests,
        venueId: id,
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      console.log(responseData);
      alert('Yay!');
    }
  };

  useEffect(() => {
    const disabledDatesArray =
      (bookings &&
        bookings.flatMap((booking) => {
          const startDate = parseISO(booking.dateFrom);
          const endDate = parseISO(booking.dateTo);
          const datesBetween = eachDayOfInterval({
            start: startDate,
            end: endDate,
          });
          return datesBetween.map((date) => new Date([date]));
        })) ||
      [];

    setDisabledDates(disabledDatesArray);
  }, [bookings]);

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
            minDate={today}
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
        {isError && <FormSubmitError message={errorMessage} />}
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
};

export default CreateBooking;
