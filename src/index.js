import debounce from 'lodash/debounce';
import alert from './js/notify';

import './scss/main.scss';
import 'material-design-icons/iconfont/material-icons.css';

import apiService from './js/apiService';
import updateGallery from './js/updateGallery';

import {
  formRef,
  inputRef,
  galleryRef,
  loadMoreBtnRef,
  spinnerRef,
} from './js/refs';

// Слушатели событий
inputRef.addEventListener('input', debounce(searchImages, 1000));
formRef.addEventListener('submit', event => {
  event.preventDefault();
});
loadMoreBtnRef.addEventListener('click', fetchAll);

// Функция для поиска
function searchImages(event) {
  apiService.query = event.target.value;

  if (apiService.query === '') {
    return alert({
      type: 'notice',
      text: 'Type the requested 🔎',
      delay: 2000,
      width: '300px',
      maxTextHeight: null,
    });
  }

  galleryRef.innerHTML = '';

  apiService.resetPage();

  fetchAll();
}

// Фетч
function fetchAll() {
  loadMoreBtnRef.classList.add('is-hidden');
  spinnerRef.classList.remove('is-hidden');

  apiService
    .fetchImages()
    .then(images => {
      if (images.length === 0) {
        return alert({
          type: 'notice',
          text: 'Nothing found ☹',
          delay: 2000,
          width: '300px',
          maxTextHeight: null,
        });
      }

      updateGallery(images);
      loadMoreBtnRef.classList.remove('is-hidden');
    })
    .finally(() => {
      spinnerRef.classList.add('is-hidden');
    });
}
