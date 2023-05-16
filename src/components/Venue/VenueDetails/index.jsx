import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLogin } from '../../../context/LoginProvider';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useToggle from '../../../hooks/useToggle';
import { IoPeopleOutline } from 'react-icons/io5';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { API_VENUE_URL, handleErrorImage } from '../../../shared';
import { VenueForm, CreateBooking } from '../../Forms';
import ImageGallery from '../../VenueImages/ImageGallery';
import VenueMeta from '../Meta';
import SkeletonLoader from '../SkeletonLoader';

const VenueDetails = () => {
  const [isEditModalOpen, toggleEditModal] = useToggle();

  let { id } = useParams();

  const { data, isLoading, isError, submit } = useAxiosFetch(
    `${API_VENUE_URL}/${id}?_owner=true&_bookings=true`
  );
  const { profile, isLoggedIn } = useLogin();

  const navigate = useNavigate();

  const handleDeleteVenue = async () => {
    await submit(`${API_VENUE_URL}/${id}`, 'delete');

    navigate('/venues');
  };

  const {
    name,
    description,
    meta,
    media,
    maxGuests,
    rating,
    bookings,
    location,
    owner,
  } = data;

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <SkeletonLoader />;
  }

  const isOwnerOfVenue = owner && profile.name === owner.name;

  return (
    <div>
      {owner && isOwnerOfVenue && (
        <div>
          <button className="btn" onClick={handleDeleteVenue}>
            Delete
          </button>
          <button className="btn" onClick={toggleEditModal}>
            Edit
          </button>
        </div>
      )}
      {isEditModalOpen && (
        <VenueForm mode={'update'} venue={data} handleClose={toggleEditModal} />
      )}
      {media && <ImageGallery galleryImages={media} />}

      <div className="my-5 flex flex-col lg:flex-row justify-between items-start">
        <div className="flex flex-col gap-2 mb-5">
          <h1 className="font-serif font-bold text-2xl">{name}</h1>
          <div className="flex gap-2">{rating}</div>
          {location && (
            <p className="flex items-center gap-2">
              <HiOutlineLocationMarker /> {location.address}, {location.city},{' '}
              {location.country}
            </p>
          )}
        </div>
        {owner && (
          <Link
            to={`/profile/${owner.name}`}
            className="flex items-center gap-2"
          >
            <img
              className="w-10 h-10 lg:w-14 lg:h-14 rounded-full object-cover"
              src={owner.avatar}
              alt={`Image of ${owner.name}`}
              onError={handleErrorImage}
            />
            <div>
              <h5 className="font-bold text-lg">{owner.name}</h5>
              <p className="text-sm">{owner.email}</p>
            </div>
          </Link>
        )}
      </div>
      <section className="flex flex-col lg:flex-row items-start gap-20">
        <div className="lg:w-3/4">
          <div>
            <h2 className="mb-3 text-lg font-bold">About the place</h2>
            <p>{description}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="my-3 text-lg font-bold">Details</h2>
            <div className="flex gap-2 items-center text-sm">
              <IoPeopleOutline size={20} />
              <p>Maximum {maxGuests} guests</p>
            </div>
            {meta && <VenueMeta meta={meta} />}
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-lg font-bold">Book your stay</h2>
          <CreateBooking bookings={bookings} id={id} isLoggedIn={isLoggedIn} />
        </div>
      </section>
    </div>
  );
};

export default VenueDetails;
