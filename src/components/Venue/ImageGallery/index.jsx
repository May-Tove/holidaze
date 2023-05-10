import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { AiOutlineCloseCircle } from 'react-icons/Ai';

const ImageGallery = ({ galleryImages }) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (index = 0) => {
    setSlideNumber(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const prevSlide = () => {
    slideNumber === 0
      ? setSlideNumber(galleryImages.length - 1)
      : setSlideNumber(slideNumber - 1);
  };

  const nextSlide = () => {
    slideNumber + 1 === galleryImages.length
      ? setSlideNumber(0)
      : setSlideNumber(slideNumber + 1);
  };

  let defaultImages = [];
  if (Array.isArray(galleryImages)) {
    defaultImages = galleryImages.slice(0, 5);
  }

  return (
    <div>
      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/90 z-50">
          <button
            className="absolute top-5 right-5 flex items-center gap-2 cursor-pointer text-white p-1 hover:bg-gray-500/80 hover:rounded"
            onClick={handleCloseModal}
          >
            <AiOutlineCloseCircle size={20} />
            Close
          </button>

          {galleryImages.length > 1 && (
            <>
              <button
                className="absolute top-50 left-10 cursor-pointer p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                onClick={prevSlide}
              >
                <HiChevronLeft size={30} />
              </button>
              <button
                className="absolute top-50 right-10 cursor-pointer p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                onClick={nextSlide}
              >
                <HiChevronRight size={30} />
              </button>
            </>
          )}

          <div>
            <img
              className="w-full max-w-[90vw] h-[250px] lg:h-[600px] m-auto object-cover"
              src={galleryImages[slideNumber]}
              alt=""
            />
            <p className="text-white text-center mt-5 shadow">
              {slideNumber + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      )}

      <div className="image-gallery relative">
        {galleryImages &&
          defaultImages.map((image, index) => {
            return (
              <img
                className="w-full h-full object-cover cursor-pointer"
                src={image}
                alt={`Image number ${index + 1}`}
                key={index}
                onClick={() => handleOpenModal(index)}
              />
            );
          })}
        {galleryImages.length > 5 && (
          <button
            className="btn absolute top-4 left-4"
            onClick={() => handleOpenModal()}
          >
            View all ({galleryImages.length})
          </button>
        )}
      </div>
    </div>
  );
};

ImageGallery.propTypes = {
  galleryImages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageGallery;
