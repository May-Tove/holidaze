import React from 'react';
import PropTypes from 'prop-types';
import useToggle from '../../../hooks/useToggle';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { CgClose } from 'react-icons/cg';
import ImageSlider from '../ImageSlider';
import { handleErrorImage } from '../../../shared';
import useImageSlider from '../../../hooks/useImageSlider';
import placeholderImg from '../../../assets/placeholderImg@2x.jpg';

const ImageGallery = ({ galleryImages }) => {
  const [isImgGalleryOpen, toggleImgGallery] = useToggle();
  const { slideNumber, setSlideNumber, prevSlide, nextSlide } =
    useImageSlider(galleryImages);

  const handleOpenModal = (index = 0) => {
    setSlideNumber(index);
    toggleImgGallery();
  };

  // Only displaying the three first images from the array in the grid by default
  let defaultImages = [];
  if (Array.isArray(galleryImages)) {
    defaultImages = galleryImages.slice(0, 3);
  }

  // If there is only one image in the array, it should take up the entire grid, if not, the custom class should be applied.
  let gridLayout = '';

  if (galleryImages.length === 1) {
    gridLayout = 'col-span-5 row-span-2';
  } else {
    gridLayout = 'image-gallery';
  }

  if (galleryImages.length === 0) {
    return (
      <img
        className="w-full h-[350px] lg:h-[550px] rounded-2xl"
        src={placeholderImg}
        alt="No image for this venue, placeholder image is displayed"
      />
    );
  }

  return (
    <>
      <div className="lg:hidden h-[350px]">
        <ImageSlider media={galleryImages} />
      </div>
      <div className="hidden lg:block relative">
        {/* Default gallery images to be displayed on the page*/}
        <div className="flex flex-col items-center h-[550px]">
          <div className={`${gridLayout} w-full h-[550px]`}>
            {galleryImages &&
              defaultImages.map((image, index) => {
                return (
                  <img
                    className="w-full h-full cursor-pointer hover:opacity-80 transition-opacity duration-300 rounded-2xl"
                    src={image}
                    alt={`Image ${index + 1}`}
                    key={index}
                    onClick={() => handleOpenModal(index)}
                    onError={(e) => handleErrorImage({ e, mode: 'image' })}
                  />
                );
              })}
            {galleryImages.length > 3 && (
              <button
                className="btn absolute top-4 left-4"
                onClick={toggleImgGallery}
              >
                View all ({galleryImages.length})
              </button>
            )}
          </div>
        </div>

        {/* Modal with all images for the venue */}
        {isImgGalleryOpen && (
          <div className="modal">
            <div className="flex items-center justify-center m-auto w-[90vw] max-w-fit mt-20">
              <button
                className="iconBtn absolute top-5 right-5"
                onClick={toggleImgGallery}
              >
                <CgClose size={20} />
              </button>

              {galleryImages.length > 1 && (
                <>
                  <button
                    className="slideBtn absolute top-50 left-10"
                    onClick={prevSlide}
                  >
                    <HiChevronLeft size={30} />
                  </button>
                  <button
                    className="slideBtn absolute top-50 right-10"
                    onClick={nextSlide}
                  >
                    <HiChevronRight size={30} />
                  </button>
                </>
              )}

              <div>
                <img
                  className="w-full max-w-[90vw] h-[250px] lg:h-[600px] m-auto"
                  src={galleryImages[slideNumber]}
                  alt={`Image number ${slideNumber + 1}`}
                />
                <p className="text-white text-center mt-5 shadow">
                  {slideNumber + 1} / {galleryImages.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

ImageGallery.propTypes = {
  galleryImages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageGallery;
