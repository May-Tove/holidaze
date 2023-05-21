import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Breadcrumbs = ({ page, venueName }) => {
  return (
    <nav className="mb-10">
      <ul className="flex gap-1">
        <li className="text-primaryDark hover:underline">
          <Link to="/">Home</Link>
        </li>
        {page === 'venue' ? (
          <>
            <li className="text-primaryDark hover:underline">
              <Link to={'/venues'}>/ Venues</Link>
            </li>
            <li className="text-gray-500">
              <span>{`/ ${venueName}`}</span>
            </li>
          </>
        ) : (
          <li className="text-gray-500">
            <span>{`/ ${page}`}</span>
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
