import { useState } from 'react';

/**
 * A custom hook for managing an image slider.
 *
 * @param {Array} images - An array of image URLs to display in the slider.
 * @returns {Object} An object containing the current slide number, functions to set the slide number and navigate to the previous/next slide.
 * @property {number} slideNumber - The current slide number.
 * @property {Function} setSlideNumber - A function to set the current slide number.
 * @property {Function} prevSlide - A function to navigate to the previous slide.
 * @property {Function} nextSlide - A function to navigate to the next slide.
 */
const useImageSlider = (images) => {
  const [slideNumber, setSlideNumber] = useState(0);

  const prevSlide = (e) => {
    e.preventDefault();

    slideNumber === 0
      ? setSlideNumber(images.length - 1)
      : setSlideNumber(slideNumber - 1);
  };

  const nextSlide = (e) => {
    e.preventDefault();

    slideNumber + 1 === images.length
      ? setSlideNumber(0)
      : setSlideNumber(slideNumber + 1);
  };

  return {
    slideNumber,
    setSlideNumber,
    prevSlide,
    nextSlide,
  };
};

export default useImageSlider;
