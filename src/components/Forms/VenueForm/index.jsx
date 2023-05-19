import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import { CgTrash, CgClose } from 'react-icons/cg';
import { TbPhotoPlus } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { API_VENUE_URL, handleErrorImage } from '../../../shared';
import ErrorMessage from '../../../shared/errorMessage';
import SuccessMessage from '../../../shared/successMessage';

export const VenueForm = ({ mode, venue, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const { submit, isLoading, isError, fetchError, success } = useAxiosFetch();

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

  const addImageUrlField = (e) => {
    e.preventDefault();
    setImageUrls([...imageUrls, []]);
  };

  const handleDeleteImageUrl = (e, index) => {
    e.preventDefault();
    const deleteUrl = [...imageUrls];
    deleteUrl.splice(index, 1);
    setImageUrls(deleteUrl);
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
      const response = await submit(API_VENUE_URL, 'post', requestData);

      reset();
      setTimeout(() => {
        navigate(`/venue/${response.data.id}`);
      }, 1000);
    } else if (isUpdateMode) {
      await submit(`${API_VENUE_URL}/${id}`, 'put', requestData);

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
            <div className="flex flex-col w-full">
              <label htmlFor="name">Name</label>
              <input
                className="bg-transparent border rounded border-primary p-1"
                type="text"
                id="name"
                {...register('name', {
                  required: true,
                })}
                defaultValue={isUpdateMode ? name : ''}
              />
              {errors.venueName && (
                <span className="text-red-600 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="description">Description</label>
              <textarea
                className="bg-transparent min-h-[100px] border rounded border-primary p-1"
                type="text"
                id="description"
                {...register('description', { required: true })}
                defaultValue={isUpdateMode ? description : ''}
              />
              {errors.description && (
                <span className="text-red-600 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="address">Address</label>
              <input
                className="bg-transparent border rounded border-primary p-1"
                type="text"
                id="address"
                {...register('address', { required: true })}
                defaultValue={isUpdateMode ? location.address : ''}
              />
              {errors.address && (
                <span className="text-red-600 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex flex-col w-full">
                <label htmlFor="city">City</label>
                <input
                  className="bg-transparent border rounded border-primary p-1"
                  type="text"
                  id="city"
                  {...register('city', { required: true })}
                  defaultValue={isUpdateMode ? location.city : ''}
                />
                {errors.city && (
                  <span className="text-red-600 text-sm mt-1">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="zip">Zip</label>
                <input
                  className="bg-transparent border rounded border-primary p-1"
                  type="text"
                  id="zip"
                  {...register('zip', { required: true })}
                  defaultValue={isUpdateMode ? location.zip : ''}
                />
                {errors.zip && (
                  <span className="text-red-600 text-sm mt-1">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="country">Country</label>
                <input
                  className="bg-transparent border rounded border-primary p-1"
                  type="text"
                  id="country"
                  {...register('country', { required: true })}
                  defaultValue={isUpdateMode ? location.country : ''}
                />
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
            <div className="flex flex-col md:flex-row  gap-5">
              <div className="flex flex-col w-full">
                <label htmlFor="price">Price</label>
                <input
                  className="bg-transparent border rounded border-primary p-1"
                  type="number"
                  id="price"
                  {...register('price', {
                    required: true,
                  })}
                  defaultValue={isUpdateMode ? price : ''}
                />
                {errors.price && (
                  <span className="text-red-600 text-sm mt-1">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="maxGuests">Max Guests</label>
                <input
                  className="bg-transparent border rounded border-primary p-1"
                  type="number"
                  id="maxGuests"
                  {...register('maxGuests', {
                    required: true,
                  })}
                  defaultValue={isUpdateMode ? maxGuests : ''}
                />
                {errors.maxGuests && (
                  <span className="text-red-600 text-sm mt-1">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="media">Images</label>
              <div className="flex flex-wrap gap-8 items-center">
                {imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-end gap-2"
                    {...register(`media[${index}].url`)}
                  >
                    <div className="w-full flex items-center gap-2">
                      <button
                        className="iconBtn"
                        onClick={(e) => handleDeleteImageUrl(e, index)}
                      >
                        <CgTrash size={20} />
                      </button>
                      <input
                        className="bg-transparent border rounded border-primary p-1 w-full"
                        type="text"
                        id="media"
                        value={url}
                        onChange={(e) => handleImageUrlChange(e, index)}
                      />
                    </div>

                    <img
                      className="w-5/6 h-[130px] rounded"
                      src={url}
                      alt="Venue image"
                      onError={handleErrorImage}
                    />
                  </div>
                ))}
                <button className="iconBtn" onClick={addImageUrlField}>
                  <TbPhotoPlus size={30} />
                </button>
              </div>

              {errors.media && (
                <span className="text-red-600 text-sm mt-1">
                  This field is required and must be a valid image URL
                </span>
              )}
            </div>
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

              {isError && <ErrorMessage message={fetchError} />}
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
