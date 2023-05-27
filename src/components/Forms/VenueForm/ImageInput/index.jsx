import React from 'react';
import PropTypes from 'prop-types';

import { CgTrash } from 'react-icons/cg';
import { TbPhotoPlus } from 'react-icons/tb';
import { handleErrorImage } from '../../../../shared';

const ImageInput = ({
  errors,
  register,
  imageUrls,
  handleImageUrlChange,
  setImageUrls,
}) => {
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

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-8 items-center">
        {imageUrls.map((url, index) => (
          <div key={index} className="flex flex-col items-end gap-2 w-fit">
            <div className="w-full flex items-center gap-2">
              <button
                className="iconBtn"
                onClick={(e) => handleDeleteImageUrl(e, index)}
              >
                <CgTrash size={20} />
              </button>
              <div className="relative w-full">
                <input
                  className="floating-input peer"
                  type="url"
                  id={`media-${index}`}
                  value={url}
                  name={`imageUrls[${index}]`}
                  placeholder=" "
                  {...register(`imageUrls[${index}]`)}
                  onChange={(e) => handleImageUrlChange(e, index)}
                />

                <label className="floating-label" htmlFor={`media-${index}`}>
                  Image
                </label>
              </div>
            </div>
            <div className="w-full">
              {errors.imageUrls && (
                <p id="inputError">
                  {errors.imageUrls[index]
                    ? errors.imageUrls[index].message
                    : ''}
                </p>
              )}
              <img
                className="w-full h-[200px] rounded"
                src={url}
                alt="Venue image"
                onError={(e) => handleErrorImage({ e, mode: 'image' })}
              />
            </div>
          </div>
        ))}
        <button
          className="iconBtn me-5"
          onClick={addImageUrlField}
          aria-label="Add a new image url input field"
        >
          <TbPhotoPlus size={30} />
        </button>
      </div>

      {errors.media && (
        <span className="text-red-600 text-sm mt-1">
          This field is required and must be a valid image URL
        </span>
      )}
    </div>
  );
};

ImageInput.propTypes = {
  errors: PropTypes.object,
  register: PropTypes.func.isRequired,
  imageUrls: PropTypes.array.isRequired,
  handleImageUrlChange: PropTypes.func.isRequired,
  setImageUrls: PropTypes.func.isRequired,
};

export default ImageInput;
