import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { CgClose } from 'react-icons/cg';
import { TbCalendar, TbTags } from 'react-icons/tb';
import { BsPeople, BsMoonStars } from 'react-icons/bs';

/**
 * A modal component that displays the booking confirmation details.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.handleCloseBookingConfirmation - The function to close the booking confirmation modal.
 * @param {Object} props.responseData - The response data containing the booking details.
 * @param {string} props.responseData.dateFrom - The start date of the booking in ISO string format.
 * @param {string} props.responseData.dateTo - The end date of the booking in ISO string format.
 * @param {number} props.responseData.guests - The number of guests for the booking.
 * @param {number} props.nightsCount - The number of nights for the booking.
 * @param {number} props.totalPrice - The total price for the booking.
 * @param {Object} props.venue - The venue details for the booking.
 * @param {string[]} props.venue.media - The media URLs for the venue.
 * @param {string} props.venue.name - The name of the venue.
 * @returns {JSX.Element} The booking confirmation modal component.
 */
const BookingConfirmation = ({
  handleCloseBookingConfirmation,
  responseData: { dateFrom, dateTo, guests },
  nightsCount,
  totalPrice,
  venue: { media, name },
}) => {
  return (
    <div className="modal overflow-y-auto">
      <div className="relative modalBody">
        <button
          className="absolute top-2 right-2 iconBtn"
          onClick={handleCloseBookingConfirmation}
        >
          <CgClose size={20} />
          <span className="sr-only">Close modal</span>
        </button>
        <div className="space-y-5 text-center md:p-4">
          <div className="border-b pb-8">
            <h3>Your booking is confirmed</h3>
            <p>Thank you for booking with Holidaze!</p>
          </div>
          <div className="flex flex-col items-center gap-5 justify-center m-auto py-4 md:flex-row">
            <img
              src={media[0]}
              alt={`Image of ${name}`}
              className="w-full h-48 rounded-2xl md:w-48"
            />
            <div className="flex flex-col gap-2">
              <h4 className="text-left font-bold text-lg">{name}</h4>
              <div className="flex items-start gap-3 text-left">
                <TbCalendar className="min-w-[20px]" size={20} />
                <p>
                  {format(new Date(dateFrom), 'EEE MMM dd, yyyy')} -{' '}
                  {format(new Date(dateTo), 'EEE MMM dd, yyyy')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <BsMoonStars size={20} />
                <p>
                  {nightsCount}
                  <span>{nightsCount === 1 ? ' Night' : ' Nights'}</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <BsPeople size={20} />
                <p>
                  {guests} <span>{guests === 1 ? ' Adult' : ' Adults'}</span>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <TbTags size={22} />
                <div className="flex flex-col items-start">
                  <p>
                    Total price{' '}
                    <span className="font-bold text-primaryDark">
                      {`$${totalPrice}`}
                    </span>
                  </p>
                  <span className="text-xs text-gray-500">Pay on arrival</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-500 border-t pt-8 text-sm">
            This booking is now added to your profile
          </p>
        </div>
      </div>
    </div>
  );
};

BookingConfirmation.propTypes = {
  handleCloseBookingConfirmation: PropTypes.func.isRequired,
  responseData: PropTypes.shape({
    dateFrom: PropTypes.string.isRequired,
    dateTo: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
  }).isRequired,
  nightsCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.string.isRequired,
  venue: PropTypes.shape({
    media: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookingConfirmation;
