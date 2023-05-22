import React from 'react';
import PropTypes from 'prop-types';
import { CgCheckO } from 'react-icons/cg';

const SuccessMessage = ({ message }) => {
  return (
    <div
      className="flex items-center gap-2 p-2 mt-5 w-full bg-green-100 text-green-600 rounded-xl"
      role="alert"
    >
      <CgCheckO size={20} />
      <p>{message}</p>
    </div>
  );
};

SuccessMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default SuccessMessage;
