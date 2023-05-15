import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import usePostApi from '../../../hooks/usePostApi';
import { useLogin } from '../../../context/LoginProvider';
import FormSubmitError from '../../Error/FormError';
import { CgClose, CgCheckO } from 'react-icons/cg';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import avatarPlaceholder from '../../../assets/avatar-placeholder.png';

const UpdateAvatar = ({ profile, handleClose, token }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { isLoading, isError, errorMessage, showSuccess, setShowSuccess } =
    usePostApi();

  const { setAvatar, avatar } = useLogin();

  const { name } = profile;
  const [inputValue, setInputValue] = useState(avatar);

  const onSubmit = async (formData) => {
    const payload = {
      avatar: formData.avatar,
    };
    const response = await fetch(
      `https://api.noroff.dev/api/v1/holidaze/profiles/${name}/media`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();

    if (response.ok) {
      console.log('avatar is updated');
      console.log(data);
      setShowSuccess(true);
      setAvatar(formData.avatar);
    }
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
      <div className="fixed top-0 right-0 left-0 bg-black/50 h-full z-50 overflow-y-auto">
        <div className="flex justify-center my-20 m-auto bg-white rounded-lg w-[90vw] md:w-[600px] p-5 h-fit">
          <form
            className="w-full h-full space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center justify-between border-b pb-5">
              <h2 className="text-xl font-bold font-serif">Change avatar</h2>
              <button
                className="bg-gray-200 p-1 rounded-lg hover:bg-gray-300"
                onClick={handleClose}
              >
                <CgClose size={20} />
              </button>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="avatar">Avatar url</label>
              <div className="flex gap-3">
                <input
                  className="bg-transparent border rounded border-primary p-1 w-full"
                  type="text"
                  id="avatar"
                  {...register('avatar', {
                    required: true,
                  })}
                  defaultValue={avatar}
                  onChange={handleInputChange}
                />
                <button
                  className="bg-gray-200 rounded-full p-1 hover:bg-gray-300"
                  onClick={handleClearInputField}
                >
                  <IoIosCloseCircleOutline size={25} />
                </button>
              </div>

              {errors.avatar && (
                <span className="text-red-600 text-sm mt-1">
                  This field is required
                </span>
              )}
              <img
                className="h-[200px] w-[200px] object-cover rounded-full mt-5 m-auto"
                src={inputValue}
                alt=""
                onError={(e) => {
                  e.target.src = avatarPlaceholder;
                }}
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
                    Avatar is now updated
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

UpdateAvatar.propTypes = {
  profile: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default UpdateAvatar;
