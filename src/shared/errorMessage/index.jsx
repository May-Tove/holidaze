import React from 'react';
import PropTypes from 'prop-types';
import { BiErrorCircle } from 'react-icons/bi';

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex gap-2 p-2 bg-red-600 text-white rounded">
      <BiErrorCircle size={20} />
      {message ? <p>{message}</p> : <p>An unknown error occurred.</p>}
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
