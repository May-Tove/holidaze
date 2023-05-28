import React from 'react';
import PropTypes from 'prop-types';
import { BiErrorCircle } from 'react-icons/bi';

/**
 * A component that displays an error message.
 *
 * @param {Object} props - The component props.
 * @param {string} props.message - The error message to display.
 * @returns {JSX.Element} An error message component.
 */
const ErrorMessage = ({ message }) => {
  return (
    <div
      className="mt-5 flex items-start gap-2 p-2 bg-red-100 text-red-600 rounded-xl"
      data-testid="error-message"
    >
      <div className="min-w-fit mt-1">
        <BiErrorCircle size={20} />
      </div>

      {message ? <p>{message}</p> : <p>An unknown error occurred.</p>}
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
