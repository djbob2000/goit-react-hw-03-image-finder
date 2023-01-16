import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        data-imageurl={image.largeImageURL}
        className={css['ImageGalleryItem-image']}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.arrayOf(
    PropTypes.exact({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default ImageGalleryItem;
