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
    <div>
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
        }  absolute right-0 top-20 w-full rounded-b-xl rounded-e-none shadow-lg bg-primaryLight flex flex-col items-center justify-center gap-5 py-5 lg:w-[300px]`}
        id="dropdownAvatarName"
      >
        <Link
          to={`/profile/${profile.name}`}
          className="px-4 py-3 text-sm text-gray-700 flex flex-col items-center text-center"
          onClick={toggle}
        >
          <img className="w-10 h-10 rounded-full" src={avatar} alt="" />

          <div className="font-medium">{profile.name}</div>
          <div>{profile.email}</div>
        </Link>
        <ul
          className="py-2 text-sm space-y-5 w-full text-center flex flex-col items-center"
          aria-labelledby="dropdownAvatarNameButton"
        >
          <li>
            <Link
              className="flex items-center gap-1 px-4 py-2 text-primaryDark hover:bg-gray-100 w-full"
              onClick={toggle}
            >
              <CgProfile size={15} />
              Add new venue
            </Link>
          </li>
          <li>
            <Link
              to={'/'}
              className="flex items-center gap-1 px-4 py-2 text-sm text-primaryDark hover:bg-gray-100 w-full"
              onClick={LogOutUser}
            >
              <MdOutlineLogout size={15} />
              Log out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

UserNavigation.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default UserNavigation;
