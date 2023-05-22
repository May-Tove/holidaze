import React from 'react';
import PropTypes from 'prop-types';

/**
 * CheckboxInput Component
 *
 * A reusable checkbox input component with label.
 *
 * @component
 * @param {string} name - The unique identifier for the checkbox
 * @param {boolean} checked - The checked status of the checkbox
 * @param {function} onChange - Function to handle the change event of the checkbox
 * @param {string} label - The label text for the checkbox
 * @example
 * ```js
 * <CheckboxInput
 *   name="example"
 *   checked={isChecked}
 *   onChange={handleChange}
 *   label="Example Checkbox"
 * />
 * ```
 */
const CheckboxInput = ({ name, checked, onChange, label }) => (
  <label htmlFor={name}>
    <input
      className="me-2"
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
    />
    {label}
  </label>
);

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default CheckboxInput;
