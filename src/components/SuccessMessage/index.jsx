import React from 'react';
import PropTypes from 'prop-types';
import { CgCheckO } from 'react-icons/cg';

/**
 * A component that displays a success message with an icon.
 *
 * @param {Object} props - The component props.
 * @param {string} props.message - The success message to display.
 * @returns {JSX.Element} A success message component.
 */
const SuccessMessage = ({ message }) => {
  return (
    <div
      className="flex items-center gap-2 p-2 mt-5 w-full bg-green-100 text-green-600 rounded-xl"
      role="alert"
      data-testid="success-message"
    >
      <CgCheckO size={20} aria-label="Check icon" />
      <p>{message}</p>
    </div>
  );
};

SuccessMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default SuccessMessage;
