import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import usePostApi from '../../../hooks/usePostApi';
import FormSubmitError from '../../Error/FormError';
import { CgTrash, CgClose, CgCheckO } from 'react-icons/cg';
import { TbPhotoPlus } from 'react-icons/tb';
import imgPlaceholder from '../../../assets/placeholderImg@2x.jpg';
import { useNavigate } from 'react-router-dom';

export const VenueForm = ({ mode, venue, handleClose, token }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    post,
    isLoading,
    isError,
    errorMessage,
    showSuccess,
    setShowSuccess,
  } = usePostApi();

  const { id, name, description, location, meta, price, maxGuests, media } =
    venue;

  const [imageUrls, setImageUrls] = useState(mode === 'update' ? media : ['']);

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

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    formData.price = Number(formData.price);
    formData.maxGuests = Number(formData.maxGuests);

    const meta = {
      wifi: formData.wifi || false,
      parking: formData.parking || false,
      breakfast: formData.breakfast || false,
      pets: formData.pets || false,
    };

    const location = {
      address: formData.address || 'Unknown',
      city: formData.city || 'Unknown',
      zip: formData.zip || 'Unknown',
      country: formData.country || 'Unknown',
    };

    const requestData = {
      name: formData.name,
      description: formData.description,
      media: imageUrls,
      price: formData.price,
      maxGuests: formData.maxGuests,
      rating: 0,
      meta: meta,
      location: location,
    };

    if (mode === 'create') {
      const response = await post(
        'https://api.noroff.dev/api/v1/holidaze/venues',
        requestData
      );

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        reset();
        setTimeout(() => {
          navigate(`/venue/${data.id}`);
        }, 1000);
      }
    } else if (mode === 'update') {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/venues/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate(`/venue/${data.id}`);
        }, 1000);
      }
    }
  };

  return (
    <>
      <div className="fixed top-0 right-0 left-0 bg-black/50 h-full z-50 overflow-y-auto">
        <div className="flex justify-center my-20 m-auto bg-white rounded-lg w-[90vw] xl:w-2/4 p-5 h-fit">
          <form
            className="w-full h-full space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center justify-between border-b pb-5">
              {mode == 'create' ? (
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
                defaultValue={mode === 'update' ? name : ''}
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
                defaultValue={mode === 'update' ? description : ''}
              />
              {errors.description && (
                <span className="text-red-600 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>

            <h3 className="font-bold">Location</h3>

            <div className="flex flex-col w-full">
              <label htmlFor="address">Address</label>
              <input
                className="bg-transparent border rounded border-primary p-1"
                type="text"
                id="address"
                {...register('address', { required: true })}
                defaultValue={mode === 'update' ? location.address : ''}
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
                  defaultValue={mode === 'update' ? location.city : ''}
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
                  defaultValue={mode === 'update' ? location.zip : ''}
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
                  defaultValue={mode === 'update' ? location.country : ''}
                />
                {errors.country && (
                  <span className="text-red-600 text-sm mt-1">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            <h3 className="font-bold">Facilities</h3>
            <div className="flex items-center flex-wrap lg:flex-nowrap  gap-5">
              <div className="flex gap-2">
                <input
                  className="bg-transparent border rounded border-primary p-1"
                  type="checkbox"
                  id="breakfast"
                  {...register('breakfast')}
                  defaultChecked={mode === 'update' ? meta.breakfast : ''}
                />
                <label htmlFor="breakfast">Breakfast</label>
              </div>
              <div className="flex gap-2">
                <input
                  className="bg-transparent border rounded border-primary p-1"
                  type="checkbox"
                  id="wifi"
                  {...register('wifi')}
                  defaultChecked={mode === 'update' ? meta.wifi : ''}
                />
                <label htmlFor="wifi">Wifi</label>
              </div>
              <div className="flex gap-2">
                <input
                  className="bg-transparent border rounded border-primary p-1"
                  type="checkbox"
                  id="pets"
                  {...register('pets')}
                  defaultChecked={mode === 'update' ? meta.pets : ''}
                />
                <label htmlFor="pets">Pets allowed</label>
              </div>
              <div className="flex gap-2">
                <input
                  className="bg-transparent border rounded border-primary p-1"
                  type="checkbox"
                  id="parking"
                  {...register('parking')}
                  defaultChecked={mode === 'update' ? meta.parking : ''}
                />
                <label htmlFor="parking">Parking</label>
              </div>
            </div>
            <h3 className="font-bold">Price and Capacity</h3>
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
                  defaultValue={mode === 'update' ? price : ''}
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
                  defaultValue={mode === 'update' ? maxGuests : ''}
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
                        className="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
                        onClick={(e) => handleDeleteImageUrl(e, index)}
                      >
                        <CgTrash />
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
                      className="w-5/6 h-[130px] rounded object-cover"
                      src={url}
                      alt="Venue image"
                      onError={(e) => {
                        e.target.src = imgPlaceholder;
                      }}
                    />
                  </div>
                ))}
                <button
                  className="rounded-full bg-gray-200 p-3  w-fit h-fit mt-3 hover:bg-gray-300"
                  onClick={addImageUrlField}
                >
                  <TbPhotoPlus size={20} />
                </button>
              </div>

              {errors.media && (
                <span className="text-red-600 text-sm mt-1">
                  This field is required and must be a valid image URL
                </span>
              )}
            </div>
            <div>
              <div className="flex gap-3 justify-end">
                {mode === 'create' ? (
                  <button className="btn" type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create venue'}
                  </button>
                ) : (
                  <button className="btn" type="submit" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update'}
                  </button>
                )}

                <button
                  className="py-2 px-3 bg-gray-200 rounded-lg"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>

              {isError && <FormSubmitError message={errorMessage} />}
              {showSuccess && (
                <div
                  className="p-2 mt-5 w-full bg-green-600 items-center gap-2 text-green-100 leading-none rounded flex lg:inline-flex"
                  role="alert"
                >
                  <CgCheckO size={20} />

                  <span className="font-semibold mr-2 text-left flex-auto">
                    {mode === 'create'
                      ? 'Venue was successfully created!'
                      : 'Venue was successfully updated!'}
                  </span>
                </div>
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
