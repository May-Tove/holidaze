import React from 'react';
import PropTypes from 'prop-types';
import useImageSlider from '../../../hooks/useImageSlider';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { handleErrorImage } from '../../../shared';

const ImageSlider = ({ media }) => {
  const slides = media.map((image) => ({ url: image }));

  const { slideNumber, prevSlide, nextSlide } = useImageSlider(slides);

  const hasMultipleImages = slides.length > 1;

  return (
    <div className="overflow-hidden relative w-full h-full">
      {slides.length > 0 && (
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
                onError={handleErrorImage}
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
      )}
    </div>
  );
};

ImageSlider.propTypes = {
  media: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageSlider;
