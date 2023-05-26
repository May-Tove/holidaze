import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../../context/LoginProvider';
import useApi from '../../../hooks/useApi';
import ErrorMessage from '../../../shared/errorMessage';
import SuccessMessage from '../../../shared/successMessage';
import { CgClose } from 'react-icons/cg';
import { API_PROFILE_URL, handleErrorImage } from '../../../shared';

/**
 * A component that allows users to update their avatar.
 * @param {Object} props - The props object.
 * @param {Object} props.profile - An object representing the user's profile.
 * @param {Function} props.handleClose - A function to close the modal.
 * @returns {JSX.Element} - A JSX element representing the UpdateAvatar component.
 */
const UpdateAvatar = ({ profile, handleClose }) => {
  const { setAvatar, avatar } = useLogin();
  const [inputValue, setInputValue] = useState(avatar);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { fetchApi, isError, isLoading, errorMessage, success } = useApi();
  const { name } = profile;

  const onSubmit = async (formData) => {
    await fetchApi(`${API_PROFILE_URL}/${name}/media`, 'put', formData);
    setAvatar(formData.avatar);

    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  const handleClearInputField = (e) => {
    e.preventDefault();
    reset({ avatar: '' });
    setInputValue('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className="modal">
        <div className="modalBody min-w-[500px]">
          <form
            className="w-full h-full space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center justify-between border-b pb-5">
              <h2>Edit avatar</h2>
              <button className="iconBtn" onClick={handleClose}>
                <CgClose size={20} />
              </button>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex gap-3">
                <div className="relative w-full">
                  <input
                    className="floating-input peer"
                    type="url"
                    id="avatar"
                    placeholder=" "
                    {...register('avatar', {
                      required: true,
                    })}
                    defaultValue={avatar}
                    onChange={handleInputChange}
                  />
                  <label className="floating-label" htmlFor="avatar">
                    Avatar url
                  </label>
                </div>

                <button
                  className="iconBtn flex items-center gap-1"
                  onClick={handleClearInputField}
                >
                  <CgClose size={15} /> Clear
                </button>
              </div>

              {errors.avatar && (
                <span className="text-red-600 text-sm mt-1">
                  This field is required and must be a valid URL
                </span>
              )}
              <img
                className="h-[150px] w-[150px] rounded-full mt-5 m-auto"
                src={inputValue}
                alt="Avatar"
                onError={(e) => handleErrorImage({ e, mode: 'avatar' })}
              />
            </div>
            <div>
              <div className="flex gap-3 justify-end border-t pt-5">
                <button className="btn" type="submit" disabled={isLoading}>
                  {isLoading ? 'Updating...' : 'Update'}
                </button>
                <button
                  className="py-2 px-3 bg-gray-200 rounded-lg"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>

              {isError && <ErrorMessage message={errorMessage} />}
              {success && (
                <SuccessMessage message="Successfully changed avatar" />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

UpdateAvatar.propTypes = {
  profile: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default UpdateAvatar;
