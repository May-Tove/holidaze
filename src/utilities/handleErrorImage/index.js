import placeholder from '../../assets/placeholderImg@2x.jpg';
import avatarPlaceholder from '../../assets/avatar-placeholder.png';

/**
 * Handles errors when loading images by replacing the image source with a placeholder image.
 *
 * @param {Object} options - An object containing the event and the mode.
 * @param {Object} options.e - The event object.
 * @param {string} options.mode - The mode of the image ('avatar' or 'image').
 */
export const handleErrorImage = ({ e, mode }) => {
  if (mode === 'avatar') return (e.target.src = avatarPlaceholder);

  if (mode === 'image') return (e.target.src = placeholder);
};
