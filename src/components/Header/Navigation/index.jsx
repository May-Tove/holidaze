import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';
import { useLogin } from '../../../context/LoginProvider';
import useToggle from '../../../hooks/useToggle';
import UserNavigation from '../UserNavigation';
import { HiBars2, HiOutlineXMark, HiOutlineSun } from 'react-icons/hi2';

/**
 * A component that displays the header navigation bar.
 *
 * @returns {JSX.Element} A header element containing the navigation bar.
 */
const Navigation = () => {
  const [isOpenUserNav, toggleUserNav] = useToggle(false);
  const [isOpenMainMenu, toggleMainMenu] = useToggle(false);

  const { isLoggedIn } = useLogin();

  return (
    <header className="bg-slate-100 shadow-lg fixed w-screen transition-colors duration-300 z-50">
      <nav
        className="flex items-center justify-between py-5 m-auto w-[90vw] max-w-screen-2xl"
        id="navBar"
      >
        <Link
          to={'/'}
          className="font-serif font-bold text-xl tracking-widest text-primaryDark flex items-center gap-2"
        >
          <HiOutlineSun size={25} aria-label="Sun icon" />
          Holidaze
        </Link>

        <ul
          className={`gap-7 items-center ${
            isOpenMainMenu
              ? 'fixed top-16 left-0 h-screen w-screen flex flex-col pt-16 bg-slate-100'
              : 'hidden'
          }   lg:flex`}
        >
          <li>
            <NavLink
              to={'/'}
              className={({ isActive }) => (isActive ? 'active' : ' nav-link')}
              onClick={isOpenMainMenu && toggleMainMenu}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/venues'}
              className={({ isActive }) => (isActive ? 'active' : ' nav-link')}
              onClick={isOpenMainMenu && toggleMainMenu}
            >
              Venues
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/contact'}
              className={({ isActive }) => (isActive ? 'active' : ' nav-link')}
              onClick={isOpenMainMenu && toggleMainMenu}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/about'}
              className={({ isActive }) => (isActive ? 'active' : ' nav-link')}
              onClick={isOpenMainMenu && toggleMainMenu}
            >
              About
            </NavLink>
          </li>
        </ul>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <UserNavigation toggle={toggleUserNav} isOpen={isOpenUserNav} />
            ) : (
              <>
                <Link
                  to={'/login'}
                  className="text-sm px-2 py-1 rounded-lg bg-primaryDark text-primaryLight hover:bg-primary transition-colors duration-300"
                  id="loginButton"
                >
                  Login
                </Link>
              </>
            )}
          </div>
          <button
            className="block lg:hidden text-xl text-primaryDark"
            aria-label="Menu button"
            onClick={toggleMainMenu}
          >
            {isOpenMainMenu ? (
              <HiOutlineXMark size={25} />
            ) : (
              <HiBars2 size={25} />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
