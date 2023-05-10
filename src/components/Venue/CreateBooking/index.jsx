import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DateRange } from 'react-date-range';
import { eachDayOfInterval, format, parse, addDays } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import usePostApi from '../../../hooks/usePostApi';
import FormSubmitError from '../../Error/FormError';

const CreateBooking = ({ bookings }) => {
  let { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const today = new Date();
  const [range, setRange] = useState([
    {
      startDate: today,
      endDate: addDays(today, 1),
      key: 'selection',
      color: '#32746D',
    },
  ]);

  const [disabledDates, setDisabledDates] = useState([]);

  const { post, isLoading, isError, errorMessage } = usePostApi();

  const onSubmit = async (data) => {
    const { dateFrom, dateTo, guests } = data;

    const parsedDateFrom = parse(dateFrom, 'dd/MM/yyyy', new Date());
    const parsedDateTo = parse(dateTo, 'dd/MM/yyyy', new Date());
    const parsedGuests = parseInt(guests);

    const response = await post(
      'https://api.noroff.dev/api/v1/holidaze/bookings',
      {
        dateFrom: parsedDateFrom.toISOString(),
        dateTo: parsedDateTo.toISOString(),
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
          if (endDate < startDate) {
            console.error(`Invalid booking dates`);
            const datesBetween = eachDayOfInterval({
              start: endDate,
              end: startDate,
            });
            return datesBetween.map((date) => new Date([date]));
          }
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
    <>
      <div className="calendarWrap">
        <DateRange
          onChange={(item) => setRange([item.selection])}
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          ranges={range}
          months={1}
          direction="horizontal"
          className="calendarElement"
          disabledDates={disabledDates}
          minDate={today}
        />
        <form
          className="flex flex-col gap-3 mt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-3">
            <div className="flex flex-col w-full">
              <label htmlFor="dateFrom">Check in</label>
              <input
                value={`${format(range[0].startDate, 'dd/MM/yyyy')}`}
                readOnly
                id="dateFrom"
                className="bg-transparent border-2 border-primary p-1"
                {...register('dateFrom')}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="dateTo">Check out</label>
              <input
                value={`${format(range[0].endDate, 'dd/MM/yyyy')}`}
                readOnly
                id="dateTo"
                className="bg-transparent border-2 border-primary p-1"
                {...register('dateTo')}
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
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
          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? 'Booking...' : 'Book'}
          </button>
          {isError && <FormSubmitError message={errorMessage} />}
        </form>
      </div>
    </>
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
