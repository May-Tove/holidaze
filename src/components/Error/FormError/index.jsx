import React from 'react';
import PropTypes from 'prop-types';
import { BiErrorCircle } from 'react-icons/bi';

const FormSubmitError = ({ message }) => {
  return (
    <div className="flex gap-2 p-2 bg-red-600 text-white rounded">
      <BiErrorCircle size={20} />
      <p>{message}</p>
    </div>
  );
};

FormSubmitError.propTypes = {
  message: PropTypes.string.isRequired,
};

export default FormSubmitError;
