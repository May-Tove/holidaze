import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdOutlineChevronRight } from 'react-icons/md';

/**
 * A component that displays breadcrumbs for navigation.
 * @param {string} props.page - The current page name.
 * @param {string} props.venueName - The name of the current venue (if applicable).
 * @returns {JSX.Element} - A JSX element representing the Breadcrumbs component.
 */
const Breadcrumbs = ({ page, venueName }) => {
  return (
    <nav className="mb-10">
      <ul className="flex items-center gap-1">
        <li className="text-primaryDark hover:underline">
          <Link to="/">Home</Link>
        </li>
        {page === 'venue' ? (
          <>
            <li className="text-primaryDark hover:underline">
              <Link to={'/venues'} className="flex items-center ">
                <MdOutlineChevronRight />
                <span>Venues</span>
              </Link>
            </li>
            <li className="flex items-center text-lightGrey">
              <MdOutlineChevronRight />
              <span>{venueName}</span>
            </li>
          </>
        ) : (
          <li className="flex items-center text-lightGrey">
            <MdOutlineChevronRight />
            <span>{page}</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  page: PropTypes.string,
  venueName: PropTypes.string,
};

export default Breadcrumbs;
