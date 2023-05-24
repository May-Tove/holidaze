import React from 'react';
import PropTypes from 'prop-types';
import { BiErrorCircle } from 'react-icons/bi';

const ErrorMessage = ({ message }) => {
  return (
    <div
      className="mt-5 flex items-center gap-2 p-2 bg-red-100 text-red-600 rounded-xl"
      data-testid="error-message"
    >
      <BiErrorCircle size={20} />
      {message ? <p>{message}</p> : <p>An unknown error occurred.</p>}
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
