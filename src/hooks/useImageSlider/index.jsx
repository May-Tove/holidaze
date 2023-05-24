import { useState } from 'react';

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
