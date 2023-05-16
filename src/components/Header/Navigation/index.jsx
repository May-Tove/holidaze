import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLogin } from '../../../context/LoginProvider';
import useToggle from '../../../hooks/useToggle';
import UserNavigation from '../UserNavigation';
import { HiBars2, HiOutlineXMark } from 'react-icons/hi2';

const Header = () => {
  const [isOpenUserNav, toggleUserNav] = useToggle(false);
  const [isOpenMainMenu, toggleMainMenu] = useToggle(false);

  const { isLoggedIn } = useLogin();

  return (
    <>
      <header className="bg-primary fixed w-screen transition-colors duration-300 ease-in-out z-50">
        <nav className="py-5 px-3 lg:px-6 ">
          <div className="flex flex-wrap items-center justify-between mx-auto max-w-screen-xl">
            <Link to={'/'} className="text-white">
              Holidaze
            </Link>
            <div className="flex items-center lg:order-2 gap-x-7 text-white">
              {isLoggedIn ? (
                <UserNavigation toggle={toggleUserNav} isOpen={isOpenUserNav} />
              ) : (
                <NavLink
                  to={'/login'}
                  className={({ isActive }) =>
                    isActive ? 'active' : ' nav-link'
                  }
                >
                  Login
                </NavLink>
              )}

              <button
                className="block lg:hidden text-xl"
                aria-label="Menu button"
                onClick={toggleMainMenu}
              >
                {isOpenMainMenu ? <HiOutlineXMark /> : <HiBars2 />}
              </button>
            </div>
            <ul
              className={`w-screen flex flex-col gap-7 items-center overflow-hidden ${
                isOpenMainMenu ? 'opacity-100 mt-40 h-screen' : 'opacity-0 h-0'
              } transition-all duration-500 ease-in-out lg:flex lg:w-auto lg:opacity-100 lg:mt-0 lg:h-auto lg:flex-row lg:items-center lg:gap-x-7`}
            >
              <li>
                <NavLink
                  to={'/'}
                  className={({ isActive }) =>
                    isActive ? 'active' : ' nav-link'
                  }
                  onClick={toggleMainMenu}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/venues'}
                  className={({ isActive }) =>
                    isActive ? 'active' : ' nav-link'
                  }
                  onClick={toggleMainMenu}
                >
                  Venues
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/contact'}
                  className={({ isActive }) =>
                    isActive ? 'active' : ' nav-link'
                  }
                  onClick={toggleMainMenu}
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/about'}
                  className={({ isActive }) =>
                    isActive ? 'active' : ' nav-link'
                  }
                  onClick={toggleMainMenu}
                >
                  About
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

/*
  <Link to={'/Register'} className="btn">
                Get Started
              </Link>*/
