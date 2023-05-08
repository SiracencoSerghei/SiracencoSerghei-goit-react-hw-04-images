import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { fetchImagesWithQuery, param } from '../services/fetchAPI';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [prevSearchQuery, setPrevSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [endOfResults, setEndOfResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [totalPhoto, setTotalPhoto] = useState(0);

  const fetchImages = useCallback(() => {
    setLoading(true);
    fetchImagesWithQuery(searchQuery, page)
      .then((data) => {
        if (data.hits.length === 0) {
          setEndOfResults(true);
        } else {
          setEndOfResults(false);
          setImages((prevImage) => [...prevImage, ...data.hits]);
          setPage((prevPage) => prevPage + 1);
          setTotalPhoto(data.totalHits);
        }
      })
      .then(scroll)
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [searchQuery, page]);

  const handleClick = () => {

    if (!endOfResults) {
      
      fetchImages();
    }
  };

  const onSearchSubmit = (searchQuery) => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
    setEndOfResults(false);
  };

  const scroll = () => {
    return window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const openModal = (image) => {
    setIsModalOpen(true);
    setSelectedImage(image);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };

  useEffect(() => {
    if (prevSearchQuery !== searchQuery) {
      fetchImages();
    }
    setPrevSearchQuery(searchQuery);
  }, [searchQuery, prevSearchQuery, fetchImages]);

  const restPhoto = totalPhoto - (page - 1) * param.per_page;

  return (
    <div>
        <SearchBar onSubmit={onSearchSubmit} searchQuery={searchQuery} />
        <ImageGallery images={images} openModal={openModal} />
        {loading && <Loader />}
        {isModalOpen && <Modal selectedImage={selectedImage} closeModal={closeModal} />}
        {page > 1 && restPhoto > 0 ? <Button onClick={handleClick} /> : null}
        {totalPhoto !== 0 && restPhoto < 0 && (
          <p className="Sorry">
            We're sorry, <br /> but you've reached the end <br /> of search results.
          </p>
        )}
        {endOfResults ? (
          <p className="Sorry">
            We're sorry, <br /> nothing was found for your search.
          </p>
        ) : null}
      </div>
  );
};

export default App;