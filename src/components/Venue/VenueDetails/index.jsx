import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useLogin } from '../../../context/LoginProvider';
import useToggle from '../../../hooks/useToggle';
import { IoPeopleOutline } from 'react-icons/io5';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { handleErrorImage } from '../../../shared';
import { VenueForm, CreateBooking } from '../../Forms';
import ImageGallery from '../../VenueImages/ImageGallery';
import Location from '../Location';
import VenueMeta from '../Meta';
import formatCurrency from '../../../shared/formatCurrency';
import RemoveVenue from '../RemoveVenue';
import Rating from '../Rating';

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
          <button className="btnSecondary" onClick={toggleEditModal}>
            Edit
          </button>
          <button className="dangerBtn" onClick={toggleDeleteModal}>
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

      <div className="my-5 flex flex-col md:flex-row justify-between items-start">
        <div className="flex flex-col gap-2 mb-5">
          <div>
            <h1>{name}</h1>
            {location && (
              <div className="flex items-center gap-2">
                <HiOutlineLocationMarker size={20} />{' '}
                <Location
                  address={location.address}
                  city={location.city}
                  country={location.country}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-5 mt-3">
            <Rating rating={rating} />
            {owner && (
              <div className="flex items-center gap-2">
                <p>Hosted by</p>
                <Link
                  to={`/profile/${owner.name}`}
                  className="flex items-center gap-2"
                >
                  <img
                    className="w-6 h-6 rounded-full"
                    src={owner.avatar}
                    alt={`Image of ${owner.name}`}
                    onError={handleErrorImage}
                  />
                  <div>
                    <h5 className="font-bold">{owner.name}</h5>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <section className="flex flex-col items-start gap-20 lg:flex-row">
        <div className="lg:w-3/4">
          <div>
            <h2 className="mb-3">About the place</h2>
            <p>{description}</p>
          </div>
          <h2 className="my-3 pt-5">Details</h2>
          <div className="flex flex-wrap gap-6">
            <div className="infoBadge">
              <IoPeopleOutline size={20} />
              <p>Maximum {maxGuests} guests</p>
            </div>
            {meta && <VenueMeta meta={meta} />}
          </div>
        </div>
        <div className="p-2 bg-white rounded-xl shadow-lg md:p-10">
          <div className="mb-5 pb-5 border-b">
            <h2 className="font-sans text-center">Book your stay</h2>
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
      email: PropTypes.string,
    }),
  }).isRequired,
};

export default VenueDetails;
