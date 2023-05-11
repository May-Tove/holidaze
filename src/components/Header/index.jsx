import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiBars2, HiOutlineXMark } from 'react-icons/hi2';
import { useLogin } from '../../context/LoginProvider';
import LoggedInNav from '../LoggedInNav';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => setIsOpen(!isOpen);
  const handleCloseMenu = () => setIsOpen(false);

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
                <LoggedInNav />
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
                onClick={handleMenuToggle}
              >
                {isOpen ? <HiOutlineXMark /> : <HiBars2 />}
              </button>
            </div>
            <ul
              className={`w-screen flex flex-col gap-7 items-center overflow-hidden ${
                isOpen ? 'opacity-100 mt-40 h-screen' : 'opacity-0 h-0'
              } transition-all duration-500 ease-in-out lg:flex lg:w-auto lg:opacity-100 lg:mt-0 lg:h-auto lg:flex-row lg:items-center lg:gap-x-7`}
            >
              <li>
                <NavLink
                  to={'/'}
                  className={({ isActive }) =>
                    isActive ? 'active' : ' nav-link'
                  }
                  onClick={handleCloseMenu}
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
                  onClick={handleCloseMenu}
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
                  onClick={handleCloseMenu}
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
                  onClick={handleCloseMenu}
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
