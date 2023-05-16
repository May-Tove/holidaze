import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useLogin } from '../../../context/LoginProvider';
import { HiChevronDown } from 'react-icons/hi';
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
        className="flex items-center"
        id="dropdownAvatarNameButton"
        onClick={toggle}
      >
        <span className="sr-only">Open Menu</span>
        <img
          className="w-5 h-5 lg:w-8 lg:h-8 mr-1 lg:mr-2 rounded-full object-cover"
          src={avatar}
          alt={`Profile image of ${profile.name}`}
          onError={handleErrorImage}
        />

        <HiChevronDown />
      </button>

      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } origin-top-right absolute right-0 mt-2 w-content rounded shadow-lg bg-white divide-y divide-gray-200 `}
        id="dropdownAvatarName"
      >
        <div className="px-4 py-3 text-sm font-medium text-gray-900">
          <div className="font-medium">{profile.name}</div>
          <div className="truncate">{profile.email}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 "
          aria-labelledby="dropdownAvatarNameButton"
        >
          <li>
            <Link
              className="block px-4 py-2 hover:bg-gray-100 "
              to={`/profile/${profile.name}`}
              onClick={toggle}
            >
              Dashboard
            </Link>
          </li>
        </ul>
        <div className="py-2">
          <Link
            to={'/'}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
            onClick={LogOutUser}
          >
            Sign out
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
