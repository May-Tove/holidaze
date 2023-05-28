import React from 'react';
import PropTypes from 'prop-types';
import { useLogin } from '../../../context/LoginProvider';
import useToggle from '../../../hooks/useToggle';
import { IoPeopleOutline } from 'react-icons/io5';
import { TbHomeEdit } from 'react-icons/tb';
import { CgTrash } from 'react-icons/cg';
import { RxDividerVertical } from 'react-icons/rx';
import { VenueForm, CreateBooking } from '../../Forms';
import ImageGallery from '../../VenueImages/ImageGallery';
import Location from '../Location';
import Meta from '../Meta';
import RemoveVenue from '../RemoveVenue';
import Rating from '../Rating';
import { formatCurrency } from '../../../utilities';
import Owner from '../Owner';

/**
 * A component that renders the details of a venue, including its name, location, description, price, images, and booking form.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.venue - The venue object to display.
 * @param {string} props.venue.id - The ID of the venue.
 * @param {string} props.venue.name - The name of the venue.
 * @param {string} props.venue.description - The description of the venue.
 * @param {number} props.venue.price - The price of the venue.
 * @param {string[]} props.venue.media - An array of image URLs for the venue.
 * @param {Object} props.venue.meta - An object containing metadata for the venue.
 * @param {number} props.venue.rating - The rating of the venue.
 * @param {Object} props.venue.location - An object containing the location information for the venue.
 * @param {string} props.venue.location.address - The address of the venue.
 * @param {string} props.venue.location.city - The city of the venue.
 * @param {string} props.venue.location.country - The country of the venue.
 * @param {number} props.venue.maxGuests - The maximum number of guests allowed at the venue.
 * @param {Object[]} props.venue.bookings - An array of booking objects for the venue.
 * @param {Object} props.venue.owner - An object containing information about the owner of the venue.
 * @param {string} props.venue.owner.name - The name of the owner of the venue.
 * @param {string} props.venue.owner.avatar - The URL of the avatar for the owner of the venue.
 * @returns {JSX.Element} A div element containing the venue details.
 */
const VenueDetails = ({ venue }) => {
  const [isEditModalOpen, toggleEditModal] = useToggle();
  const [isDeleteModalOpen, toggleDeleteModal] = useToggle();
  const { profile, isLoggedIn } = useLogin();
  const {
    id,
    name,
    description,
    price,
    media,
    meta,
    rating,
    location,
    maxGuests,
    bookings,
    owner,
  } = venue;

  const isOwnerOfVenue = owner && profile.name === owner.name;
  const venuePrice = formatCurrency(price);

  return (
    <div>
      {owner && isOwnerOfVenue && (
        <div className="flex gap-2 justify-end mb-3">
          <button
            className="btn-secondary flex items-center gap-1"
            onClick={toggleEditModal}
          >
            <TbHomeEdit size={20} />
            Edit
          </button>
          <button
            className="btn-danger flex items-center gap-1"
            onClick={toggleDeleteModal}
          >
            <CgTrash size={20} />
            Delete
          </button>
        </div>
      )}
      {isDeleteModalOpen && (
        <RemoveVenue id={id} handleClose={toggleDeleteModal} />
      )}
      {isEditModalOpen && (
        <VenueForm
          mode={'update'}
          venue={venue}
          handleClose={toggleEditModal}
        />
      )}
      {media && <ImageGallery galleryImages={media} />}

      <section className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-20">
        <div className="w-full">
          <div>
            <div className="border-b pb-4 mt-5">
              <h1>{name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <Location
                  address={location.address}
                  city={location.city}
                  country={location.country}
                />
                <RxDividerVertical size={20} className="text-gray-300" />
                <Rating rating={rating} />
              </div>
            </div>
            <div className="flex items-center gap-5 mt-7"></div>
            <div>
              <h2 className="mb-3">About the place</h2>
              <Owner owner={owner} />
              <p className="break-words mt-3">{description}</p>
            </div>
            <h2 className="my-3 pt-5">Details</h2>
            <div className="flex flex-wrap gap-6">
              <div className="metas-badge">
                <IoPeopleOutline size={20} />
                <p>Maximum {maxGuests} guests</p>
              </div>
              <Meta meta={meta} />
            </div>
          </div>
        </div>
        <div className="w-fit max-w-[400px] px-5 py-7 mt-7 bg-white rounded-xl shadow-lg lg:p-9">
          <div className="mb-5 pb-5 border-b">
            <h2 className="text-center">Book your stay</h2>
          </div>
          <p className="text-sm text-center">
            Select available dates in the calendar below
          </p>
          <CreateBooking
            bookings={bookings}
            id={id}
            isLoggedIn={isLoggedIn}
            price={venuePrice}
            venue={venue}
          />
        </div>
      </section>
    </div>
  );
};

VenueDetails.propTypes = {
  venue: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number,
    media: PropTypes.arrayOf(PropTypes.string),
    meta: PropTypes.object,
    rating: PropTypes.number,
    location: PropTypes.shape({
      address: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.string,
    }),
    maxGuests: PropTypes.number,
    bookings: PropTypes.array,
    owner: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }).isRequired,
};

export default VenueDetails;
