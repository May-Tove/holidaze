import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import PlaceholderImage from '../PlaceholderImage';

const ImageSlider = ({ media }) => {
  const slides = media.map((image) => ({ url: image }));

  const [slideNumber, setSlideNumber] = useState(0);

  const prevSlide = () => {
    slideNumber === 0
      ? setSlideNumber(slides.length - 1)
      : setSlideNumber(slideNumber - 1);
  };

  const nextSlide = () => {
    slideNumber + 1 === slides.length
      ? setSlideNumber(0)
      : setSlideNumber(slideNumber + 1);
  };

  const hasMultipleImages = slides.length > 1;

  return (
    <div className="overflow-hidden relative w-full h-full">
      {slides.length > 0 ? (
        <>
          <div
            className="flex w-full h-full transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${slideNumber * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <img
                key={index}
                src={slide.url}
                className="w-full object-cover flex-shrink-0 "
                alt="Image of venue"
              />
            ))}
          </div>
          {hasMultipleImages && (
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button
                onClick={prevSlide}
                className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                aria-label="Previous image"
              >
                <HiChevronLeft size={25} />
              </button>
              <button
                onClick={nextSlide}
                className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                aria-label="Next image"
              >
                <HiChevronRight size={25} />
              </button>
            </div>
          )}

          {hasMultipleImages && (
            <div className="absolute bottom-4 right-0 left-0">
              <div className="flex items-center justify-center gap-2">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className={`
              transition-all w-2 h-2  bg-white rounded-full shadow
              ${slideNumber === i ? '' : 'bg-opacity-50'}
            `}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-72 ">
          <PlaceholderImage />
        </div>
      )}
    </div>
  );
};

ImageSlider.propTypes = {
  media: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageSlider;
