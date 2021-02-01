import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import { galleryRef } from '../references/refs';

galleryRef.addEventListener('click', openModal);

function openModal(event) {
    event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const img = `<img src= ${event.target.dataset.source}>`;
  const instance = basicLightbox.create(img);

  instance.show();
}