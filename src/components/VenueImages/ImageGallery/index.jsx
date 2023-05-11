import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { AiOutlineCloseCircle } from 'react-icons/Ai';
import ImageSlider from '../ImageSlider';
import PlaceholderImage from '../PlaceholderImage';

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

  // Only displaying the three first images from the array in the grid by default
  let defaultImages = [];
  if (Array.isArray(galleryImages)) {
    defaultImages = galleryImages.slice(0, 3);
  }

  // if there is only one image in the array, it should take up the entire grid, if not, the custom class should be applied.
  let gridLayout = '';

  if (galleryImages.length === 1) {
    gridLayout = 'col-span-5 row-span-2';
  } else {
    gridLayout = 'image-gallery';
  }

  return (
    <>
      <div className="lg:hidden h-[350px]">
        <ImageSlider media={galleryImages} />
      </div>
      <div className="hidden lg:block relative">
        {openModal && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/90 z-50">
            <button
              className="absolute top-5 right-5 flex items-center gap-2 cursor-pointer text-white p-1 hover:bg-gray-500/80"
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

        <div className={`${gridLayout} h-[600px]`}>
          {galleryImages.length > 0 ? (
            defaultImages.map((image, index) => {
              return (
                <img
                  className="w-full h-full object-cover cursor-pointer hover:opacity-70 transition-opacity"
                  src={image}
                  alt={`Image ${index + 1}`}
                  key={index}
                  onClick={() => handleOpenModal(index)}
                />
              );
            })
          ) : (
            <div className="row-span-2 col-span-5">
              <PlaceholderImage />
            </div>
          )}
          {galleryImages.length > 3 && (
            <button
              className="btn absolute top-4 left-4"
              onClick={() => handleOpenModal()}
            >
              View all ({galleryImages.length})
            </button>
          )}
        </div>
      </div>
    </>
  );
};

ImageGallery.propTypes = {
  galleryImages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageGallery;
