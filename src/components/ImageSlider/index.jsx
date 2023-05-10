import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { BiImage } from 'react-icons/bi';

const ImageSlider = ({ media }) => {
  const slides = media.map((image) => ({ url: image }));

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () =>
    setCurrentIndex((currentIndex) =>
      currentIndex === 0 ? slides.length - 1 : currentIndex - 1
    );
  const next = () =>
    setCurrentIndex((currentIndex) =>
      currentIndex === slides.length - 1 ? 0 : currentIndex + 1
    );

  const hasMultipleImages = slides.length > 1;

  return (
    <div className="overflow-hidden relative w-full h-full">
      {slides.length > 0 ? (
        <>
          <div
            className="flex w-full h-full transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
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
                onClick={prev}
                className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                aria-label="Previous image"
              >
                <HiChevronLeft size={25} />
              </button>
              <button
                onClick={next}
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
              ${currentIndex === i ? '' : 'bg-opacity-50'}
            `}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-72 flex justify-center items-center bg-gray-300 text-gray-400">
          <BiImage size={100} />
        </div>
      )}
    </div>
  );
};

ImageSlider.propTypes = {
  media: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageSlider;
