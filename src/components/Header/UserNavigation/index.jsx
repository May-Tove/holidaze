import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useLogin } from '../../../context/LoginProvider';
import { MdOutlineLogout } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import Avatar from '../../Avatar';

/**
 * A component that displays the user navigation menu.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.toggle - A function to toggle the user navigation menu.
 * @param {boolean} props.isOpen - A boolean indicating whether the user navigation menu is open.
 * @returns {JSX.Element} A div element containing the user navigation menu.
 */
const UserNavigation = ({ toggle, isOpen }) => {
  const { setIsLoggedIn, profile, avatar } = useLogin();

  /**
   * A function to log out the user.
   */
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
        }  absolute right-0 top-16 w-1/3 rounded-b-xl rounded-e-none shadow-lg bg-slate-100 py-2 lg:w-[300px] lg:top-20`}
        id="dropdownAvatarName"
      >
        <ul
          className="text-sm space-y-2 divide-y pt-5"
          aria-labelledby="dropdownAvatarNameButton"
        >
          <li>
            <Link
              to={`/profile/${profile.name}`}
              className="nav-link flex items-center gap-1 px-4 py-2"
              onClick={toggle}
            >
              <CgProfile size={15} aria-label="Profile icon" />
              Profile
            </Link>
          </li>
          <li>
            <Link
              to={'/'}
              className="nav-link flex items-center gap-1 px-4 py-2"
              onClick={LogOutUser}
            >
              <MdOutlineLogout size={15} aria-label="Log out icon" />
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
