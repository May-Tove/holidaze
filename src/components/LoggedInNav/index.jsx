import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../../context/LoginProvider';
import { HiChevronDown } from 'react-icons/hi';

const LoggedInNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { setIsLoggedIn, profile } = useLogin();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const LogOutUser = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return (
    <div className="relative">
      <button
        className="flex items-center"
        id="dropdownAvatarNameButton"
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open Menu</span>
        <img
          className="w-5 h-5 lg:w-8 lg:h-8 mr-1 lg:mr-2 rounded-full object-cover"
          src={profile.avatar}
          alt={`Profile image of ${profile.name}`}
        />

        <HiChevronDown />
      </button>

      <div
        className={`${
          isDropdownOpen ? 'block' : 'hidden'
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
              to={`/Profile/${profile.name}`}
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

export default LoggedInNav;
