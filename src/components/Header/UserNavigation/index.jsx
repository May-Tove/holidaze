import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useLogin } from '../../../context/LoginProvider';
import { MdOutlineLogout } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import Avatar from '../../Avatar';

const UserNavigation = ({ toggle, isOpen }) => {
  const { setIsLoggedIn, profile, avatar } = useLogin();

  const LogOutUser = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return (
    <div>
      <button
        className="border-4 border-transparent rounded-full flex items-center text-primaryDark transition-all duration-300 hover:border-slate-300"
        id="dropdownAvatarNameButton"
        onClick={toggle}
        aria-label="Profile menu button"
      >
        <span className="sr-only">Open Menu</span>
        <Avatar
          className="w-7 h-7 lg:w-10 lg:h-10 rounded-full"
          src={avatar}
          alt={`Profile image of ${profile.name}`}
        />
      </button>
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        }  absolute right-0 top-16 w-full rounded-b-xl rounded-e-none shadow-lg bg-slate-100 flex flex-col items-center justify-center gap-5 py-5 lg:w-[300px] lg:top-20`}
        id="dropdownAvatarName"
      >
        <ul
          className="py-2 text-sm space-y-5 w-full text-center flex flex-col items-center divide-y"
          aria-labelledby="dropdownAvatarNameButton"
        >
          <li className="w-full">
            <Link
              to={`/profile/${profile.name}`}
              className="flex items-center gap-1 px-4 py-2 text-primaryDark hover:bg-gray-100 w-full"
              onClick={toggle}
            >
              <CgProfile size={15} />
              Profile
            </Link>
          </li>
          <li className="w-full">
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
