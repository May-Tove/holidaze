import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useLogin } from '../../../context/LoginProvider';
import { MdOutlineLogout } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { handleErrorImage } from '../../../shared';

const UserNavigation = ({ toggle, isOpen }) => {
  const { setIsLoggedIn, profile, avatar } = useLogin();

  const LogOutUser = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return (
    <div className="relative">
      <button
        className="flex items-center text-primaryDark"
        id="dropdownAvatarNameButton"
        onClick={toggle}
        aria-label="Profile menu button"
      >
        <span className="sr-only">Open Menu</span>
        <img
          className="w-7 h-7 lg:w-10 lg:h-10 rounded-full"
          src={avatar}
          alt={`Profile image of ${profile.name}`}
          onError={handleErrorImage}
        />
      </button>

      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } origin-top-right absolute right-0 mt-2 w-fit rounded shadow-lg bg-white divide-y`}
        id="dropdownAvatarName"
      >
        <div className="px-4 py-3 text-sm text-gray-700">
          <div className="font-medium">{profile.name}</div>
          <div>{profile.email}</div>
        </div>
        <ul className="py-2 text-sm" aria-labelledby="dropdownAvatarNameButton">
          <li>
            <Link
              className="flex items-center gap-1 px-4 py-2 text-primaryDark hover:bg-gray-100 "
              to={`/profile/${profile.name}`}
              onClick={toggle}
            >
              <CgProfile size={15} />
              Profile
            </Link>
          </li>
        </ul>
        <div className="py-2">
          <Link
            to={'/'}
            className="flex items-center gap-1 px-4 py-2 text-sm text-primaryDark hover:bg-gray-100"
            onClick={LogOutUser}
          >
            <MdOutlineLogout size={15} />
            Log out
          </Link>
        </div>
      </div>
    </div>
  );
};

UserNavigation.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default UserNavigation;
