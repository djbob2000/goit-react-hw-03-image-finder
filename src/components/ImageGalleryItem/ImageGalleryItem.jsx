import React from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        data-imageurl={image.largeImageURL}
        className={css["ImageGalleryItem-image"]}
      />
    </li>
  );
};

export default ImageGalleryItem;