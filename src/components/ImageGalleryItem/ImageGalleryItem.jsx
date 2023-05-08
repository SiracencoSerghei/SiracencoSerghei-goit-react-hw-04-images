
import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({image, onImageClick}) => {
   const handleClick = () => {
    onImageClick(image);
  };
  const { webformatURL, tags } = image;
    return (
      <li className="ImageGalleryItem">
        <img
          src={webformatURL}
          alt={tags}
          className="ImageGalleryItem-image"
          onClick={handleClick}
        />
      </li>
    );
  }

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;