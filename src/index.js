import debounce from 'lodash/debounce';
import alert from './js/notify';

import 'material-design-icons/iconfont/material-icons.css';
import './scss/main.scss';

import './js/apiService';
import apiService from './js/apiService';
import updateGallery from './js/updateGallery';

import { formRef, inputRef, galleryRef, loadMoreBtnRef } from './js/refs';

// Слушатели событий
inputRef.addEventListener('input', debounce(searchImages, 1000));
formRef.addEventListener('submit', event => {
  event.preventDefault();
});

// Функция для поиска
function searchImages(event) {
  apiService.query = event.target.value;

  if (apiService.query === '') {
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

  apiService.fetchImages().then(updateGallery);
}

// Кнопка для загрузки картинок
loadMoreBtnRef.addEventListener('click', () => {
  apiService.fetchImages().then(updateGallery);
});

// Функция для очистки сетки
function clearContainer() {
  galleryRef.innerHTML = '';
  apiService.resetPage();
}
