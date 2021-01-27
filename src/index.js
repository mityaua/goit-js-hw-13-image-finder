import debounce from 'lodash/debounce';
import alert from './js/notify';

import 'material-design-icons/iconfont/material-icons.css';
import './scss/main.scss';

import './js/apiService';
import fetchImages from './js/apiService';
import updateGallery from './js/updateGallery';

import { formRef, inputRef, galleryRef } from './js/refs';

// Слушатели событий
inputRef.addEventListener('input', debounce(searchImages, 1000));
formRef.addEventListener('submit', event => {
  event.preventDefault();
});

// Функция для поиска
function searchImages(event) {
  const searchQuery = event.target.value;

  if (event.target.value === '') {
    clearContainer();
    return alert({
      type: 'notice',
      text: 'Type the requested 🔎',
      delay: 2000,
      width: '300px',
      maxTextHeight: null,
    });
  }

  clearContainer();

  fetchImages(searchQuery).then(updateGallery);
}

// Функция для очистки сетки
function clearContainer() {
  galleryRef.innerHTML = '';
}
