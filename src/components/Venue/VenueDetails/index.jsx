import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useApi from '../../../hooks/useApi';
import API_URL from '../../../shared/url';
import { IoPeopleOutline } from 'react-icons/io5';
import Rating from '../../Rating';
import ImageGallery from '../ImageGallery';
import VenueMeta from '../VenueMeta';
import CreateBooking from '../CreateBooking';

const VenueDetails = () => {
  let { id } = useParams();
  const { data, isLoading, isError } = useApi(
    `${API_URL}/venues/${id}?_owner=true&_bookings=true`
  );

  console.log(data);

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

  if (isLoading || !data) {
    return <div>Loading</div>;
  }

  return (
    <div>
      {media && <ImageGallery galleryImages={media} />}

      <div className="my-5 flex flex-col lg:flex-row justify-between items-start">
        <div>
          <h1 className="font-serif font-bold text-2xl">{name}</h1>
          <div className="flex gap-2">
            <Rating rating={rating} />
          </div>
          {location && (
            <p>
              {location.address}, {location.city}, {location.country}
            </p>
          )}
        </div>
        {owner && (
          <Link
            to={`/Profile/${owner.name}`}
            className="flex items-center gap-2"
          >
            {owner && owner.avatar && (
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={owner.avatar}
                alt=""
              />
            )}
            <div>
              {owner && owner.name && (
                <h5 className="font-bold">{owner.name}</h5>
              )}
              {owner && owner.email && <p>{owner.email}</p>}
            </div>
          </Link>
        )}
      </div>
      <section className="flex gap-20">
        <div className="w-3/4">
          <div>
            <h2 className="mb-3 text-lg font-bold">About the place</h2>
            <p>{description}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="my-3 text-lg font-bold">Details</h2>
            <div className="flex gap-2 items-center text-sm">
              <IoPeopleOutline size={20} />
              <p> Maximum {maxGuests} guests</p>
            </div>
            {meta && <VenueMeta meta={meta} />}
          </div>
        </div>
      </section>
      <div>
        <h2 className="mt-10 mb-3 text-lg font-bold">Book your stay</h2>
        <CreateBooking bookings={bookings} />
      </div>
    </div>
  );
};

export default VenueDetails;
