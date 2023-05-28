import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLogin } from '../../../context/LoginProvider';
import useApi from '../../../hooks/useApi';
import ErrorMessage from '../../ErrorMessage';
import SuccessMessage from '../../SuccessMessage';
import { CgClose } from 'react-icons/cg';
import { API_PROFILE_URL } from '../../../shared';
import Avatar from '../../Avatar';

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

  const schema = yup
    .object({
      avatar: yup
        .string()
        .url('Avatar must be a valid URL if provided.')
        .notRequired(),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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
        <div className="modal-body min-w-[90vw] md:min-w-[40vw]">
          <form
            className="w-full h-full space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center justify-between border-b pb-5">
              <h2>Edit avatar</h2>
              <button className="icon-btn" onClick={handleClose}>
                <CgClose size={20} aria-label="Close icon" />
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
                    {...register('avatar')}
                    defaultValue={avatar}
                    onChange={handleInputChange}
                  />
                  <label className="floating-label" htmlFor="avatar">
                    Avatar URL
                  </label>
                </div>

                <button
                  className="icon-btn flex items-center gap-1"
                  onClick={handleClearInputField}
                >
                  <CgClose size={15} aria-label="Close icon" /> Clear
                </button>
              </div>
              <p id="inputError">{errors.avatar?.message}</p>
              <Avatar
                src={inputValue}
                alt="Avatar"
                className="h-[150px] w-[150px] rounded-full mt-5 m-auto"
              />
            </div>
            <div className="flex gap-3 justify-end border-t pt-5">
              <button className="btn" type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update'}
              </button>
              <button className="btn-secondary" onClick={handleClose}>
                Cancel
              </button>
            </div>
            {isError && <ErrorMessage message={errorMessage} />}
            {success && (
              <SuccessMessage message="Successfully changed avatar" />
            )}
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
