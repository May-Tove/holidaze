import placeholder from '../../assets/placeholderImg@2x.jpg';
import avatarPlaceholder from '../../assets/avatar-placeholder.png';

export const handleErrorImage = ({ e, mode }) => {
  if (mode === 'avatar') return (e.target.src = avatarPlaceholder);

  if (mode === 'image') return (e.target.src = placeholder);
};
