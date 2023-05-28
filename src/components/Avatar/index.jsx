import React from 'react';
import PropTypes from 'prop-types';
import { handleErrorImage } from '../../utilities';
import avatarPlaceholder from '../../assets/avatar-placeholder.png';

const Avatar = ({ src, alt, ...props }) => {
  return (
    <img
      src={src || avatarPlaceholder}
      alt={alt}
      onError={(e) => handleErrorImage({ e, mode: 'avatar' })}
      {...props}
    />
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
};

export default Avatar;
