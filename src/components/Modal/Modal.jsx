import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';

const Modal = ({ closeModal, selectedImage }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    const img = new Image();
    img.src = selectedImage.largeImageURL;
    img.onload = () => setLoading(false);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      const img = new Image();
      img.src = selectedImage.largeImageURL;
      img.onload = null;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, closeModal]);

  const overlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="Overlay" onClick={overlayClick}>
      <div className="Modal">
        {loading && <Loader />}
        <img
          src={selectedImage.largeImageURL}
          alt={selectedImage.tags}
          onLoad={() => setLoading(false)}
          style={{ display: loading ? 'none' : 'block' }}
        />
        {!loading && <p className="tags">{selectedImage.tags}</p>}
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  selectedImage: PropTypes.object.isRequired,
};

export default Modal;