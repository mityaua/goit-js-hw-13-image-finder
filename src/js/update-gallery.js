import galleryTpl from '../templates/gallery-item.hbs';
import { galleryRef } from './references/refs';

function updateGallery(hits) {
  const markup = galleryTpl(hits);

  galleryRef.insertAdjacentHTML('beforeend', markup);
}

export default updateGallery;
