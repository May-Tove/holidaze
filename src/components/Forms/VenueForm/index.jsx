import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { CgClose } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { API_VENUE_URL } from '../../../shared';
import ImageInput from './ImageInput';
import ErrorMessage from '../../../shared/errorMessage';
import SuccessMessage from '../../../shared/successMessage';
import useMethodApi from '../../../hooks/useMethodApi';

export const VenueForm = ({ mode, venue, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const { fetchWithMethod, isLoading, isError, errorMessage, success } =
    useMethodApi();

  const { id, name, description, location, meta, price, maxGuests, media } =
    venue;
  const isCreateMode = mode === 'create';
  const isUpdateMode = mode === 'update';

  const [imageUrls, setImageUrls] = useState(isUpdateMode ? media : ['']);

  const handleImageUrlChange = (onChangeValue, index) => {
    const newUrls = [...imageUrls];
    newUrls[index] = String(onChangeValue.target.value);
    setImageUrls(newUrls);
  };

  const onSubmit = async ({
    name,
    description,
    address,
    city,
    zip,
    country,
    wifi,
    parking,
    breakfast,
    pets,
    price,
    maxGuests,
  }) => {
    const meta = {
      wifi: wifi || false,
      parking: parking || false,
      breakfast: breakfast || false,
      pets: pets || false,
    };

    const location = {
      address: address || 'Unknown',
      city: city || 'Unknown',
      zip: zip || 'Unknown',
      country: country || 'Unknown',
    };

    const requestData = {
      name,
      description,
      media: imageUrls,
      price: Number(price),
      maxGuests: Number(maxGuests),
      rating: 0,
      meta,
      location,
    };

    if (isCreateMode) {
      const response = await fetchWithMethod(
        API_VENUE_URL,
        'post',
        requestData
      );

      reset();
      setTimeout(() => {
        navigate(`/venue/${response.data.id}`);
      }, 1000);
    } else if (isUpdateMode) {
      await fetchWithMethod(`${API_VENUE_URL}/${id}`, 'put', requestData);

      setTimeout(() => {
        handleClose();
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <>
      <div className="modal overflow-y-auto">
        <div className="modalBody">
          <form
            className="w-full h-full space-y-7"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center justify-between border-b pb-5">
              {isCreateMode ? (
                <h2 className="text-xl font-bold font-serif">Create Venue</h2>
              ) : (
                <h2 className="text-xl font-bold font-serif">Update Venue</h2>
              )}
              <button
                className="bg-gray-200 p-1 rounded-lg hover:bg-gray-300"
                onClick={handleClose}
              >
                <CgClose size={20} />
              </button>
            </div>
            <div>
              <div className="relative">
                <input
                  className="floating-input peer"
                  type="text"
                  id="name"
                  placeholder=" "
                  {...register('name', {
                    required: true,
                  })}
                  defaultValue={isUpdateMode ? name : ''}
                />
                <label className="floating-label" htmlFor="name">
                  Name
                </label>
              </div>
              {errors.name && (
                <span className="text-red-600 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <div className="relative">
                <textarea
                  className="floating-textarea peer h-[120px]"
                  type="text"
                  id="description"
                  placeholder=" "
                  {...register('description', { required: true })}
                  defaultValue={isUpdateMode ? description : ''}
                />
                <label className="floating-label" htmlFor="description">
                  Description
                </label>
              </div>
              {errors.description && (
                <span className="text-red-600 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  className="floating-input peer"
                  type="text"
                  id="address"
                  placeholder=" "
                  {...register('address', { required: true })}
                  defaultValue={isUpdateMode ? location.address : ''}
                />
                <label className="floating-label" htmlFor="address">
                  Address
                </label>
              </div>
              {errors.address && (
                <span className="text-red-600 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div>
                <div className="relative">
                  <input
                    className="floating-input peer"
                    type="text"
                    id="city"
                    placeholder=" "
                    {...register('city', { required: true })}
                    defaultValue={isUpdateMode ? location.city : ''}
                  />
                  <label className="floating-label" htmlFor="city">
                    City
                  </label>
                </div>
                {errors.city && (
                  <span className="text-red-600 text-sm mt-1">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <div className="relative">
                  <input
                    className="floating-input peer"
                    type="text"
                    id="zip"
                    placeholder=" "
                    {...register('zip', { required: true })}
                    defaultValue={isUpdateMode ? location.zip : ''}
                  />
                  <label className="floating-label" htmlFor="zip">
                    Zip
                  </label>
                </div>
                {errors.zip && (
                  <span className="text-red-600 text-sm mt-1">
                    This field is required
                  </span>
                )}
              </div>

              <div>
                <div className="relative">
                  <input
                    className="floating-input peer"
                    type="text"
                    id="country"
                    placeholder=" "
                    {...register('country', { required: true })}
                    defaultValue={isUpdateMode ? location.country : ''}
                  />
                  <label className="floating-label" htmlFor="country">
                    Country
                  </label>
                </div>
                {errors.country && (
                  <span className="text-red-600 text-sm mt-1">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center flex-wrap lg:flex-nowrap gap-5">
              <div className="flex gap-2">
                <input
                  className="bg-transparent border rounded border-primary p-1"
                  type="checkbox"
                  id="breakfast"
                  {...register('breakfast')}
                  defaultChecked={isUpdateMode ? meta.breakfast : ''}
                />
                <label htmlFor="breakfast">Breakfast</label>
              </div>
              <div className="flex gap-2">
                <input
                  className="bg-transparent border rounded border-primary p-1"
                  type="checkbox"
                  id="wifi"
                  {...register('wifi')}
                  defaultChecked={isUpdateMode ? meta.wifi : ''}
                />
                <label htmlFor="wifi">Wifi</label>
              </div>
              <div className="flex gap-2">
                <input
                  className="bg-transparent border rounded border-primary p-1"
                  type="checkbox"
                  id="pets"
                  {...register('pets')}
                  defaultChecked={isUpdateMode ? meta.pets : ''}
                />
                <label htmlFor="pets">Pets allowed</label>
              </div>
              <div className="flex gap-2">
                <input
                  className="bg-transparent border rounded border-primary p-1"
                  type="checkbox"
                  id="parking"
                  {...register('parking')}
                  defaultChecked={isUpdateMode ? meta.parking : ''}
                />
                <label htmlFor="parking">Parking</label>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <div>
                <div className="relative w-full">
                  <input
                    className="floating-input peer"
                    type="number"
                    id="price"
                    placeholder=" "
                    {...register('price', {
                      required: true,
                    })}
                    defaultValue={isUpdateMode ? price : ''}
                  />
                  <label className="floating-label" htmlFor="price">
                    Price
                  </label>
                </div>
                {errors.price && (
                  <span className="text-red-600 text-sm mt-1">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <div className="relative w-full">
                  <input
                    className="floating-input peer"
                    type="number"
                    id="maxGuests"
                    placeholder=" "
                    {...register('maxGuests', {
                      required: true,
                    })}
                    defaultValue={isUpdateMode ? maxGuests : ''}
                  />
                  <label className="floating-label" htmlFor="maxGuests">
                    Max Guests
                  </label>
                </div>
                {errors.maxGuests && (
                  <span className="text-red-600 text-sm mt-1">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <ImageInput
              errors={errors}
              register={register}
              imageUrls={imageUrls}
              setImageUrls={setImageUrls}
              handleImageUrlChange={handleImageUrlChange}
            />
            <div>
              <div className="flex gap-3 justify-end border-t pt-5">
                {isUpdateMode ? (
                  <button className="btn" type="submit" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update'}
                  </button>
                ) : (
                  <button className="btn" type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create venue'}
                  </button>
                )}

                <button
                  className="py-2 px-3 bg-gray-200 rounded-lg"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>

              {isError && <ErrorMessage message={errorMessage} />}
              {success && (
                <SuccessMessage
                  message={
                    isUpdateMode
                      ? 'Venue was successfully updated!'
                      : 'Venue was successfully created!'
                  }
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

VenueForm.propTypes = {
  mode: PropTypes.oneOf(['create', 'update']).isRequired,
  handleClose: PropTypes.func.isRequired,
  venue: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.shape({
      address: PropTypes.string,
      city: PropTypes.string,
      zip: PropTypes.string,
      country: PropTypes.string,
    }),
    meta: PropTypes.shape({
      breakfast: PropTypes.bool,
      wifi: PropTypes.bool,
      pets: PropTypes.bool,
      parking: PropTypes.bool,
    }),
    price: PropTypes.number,
    maxGuests: PropTypes.number,
    media: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  token: PropTypes.string,
};
