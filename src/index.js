import debounce from 'lodash/debounce';
import alert from './js/notify';

import apiService from './js/apiService';
import updateGallery from './js/updateGallery';
import LoadMoreBtn from './js/components/loadMoreBtn';
import './js/lightbox';

import './scss/main.scss';
import 'material-design-icons/iconfont/material-icons.css';

import { formRef, inputRef, galleryRef } from './js/refs';

const loadMoreBtn = new LoadMoreBtn('#load-btn');

// Слушатели событий
inputRef.addEventListener('input', debounce(searchFormHandler, 1000));
formRef.addEventListener('submit', event => {
  event.preventDefault();
});
loadMoreBtn.refs.button.addEventListener('click', fetchGallery);

// Поиск
function searchFormHandler(event) {
  apiService.query = event.target.value;

  if (apiService.query === '') {
    clearContainer();
    loadMoreBtn.hide();
    return alert({
      type: 'notice',
      text: 'Type the request 🔎',
      delay: 2000,
      width: '300px',
      maxTextHeight: null,
    });
  }

  clearContainer();
  apiService.resetPage();
  fetchGallery();
}

// Фетч и отрисовка
function fetchGallery() {
  loadMoreBtn.disabled();

  apiService.fetchImages().then(images => {
    if (images.length === 0) {
      loadMoreBtn.hide();
      return alert({
        type: 'notice',
        text: 'Nothing found ☹',
        delay: 2000,
        width: '300px',
        maxTextHeight: null,
      });
    }

    updateGallery(images);
    loadMoreBtn.show();
    loadMoreBtn.enable();

    scrollToTop();
  });
}

// Очищает контент
function clearContainer() {
  galleryRef.innerHTML = '';
}

// Скроллит контент
function scrollToTop() {
  if (galleryRef.children.length > apiService.perPage) {
    const { scrollTop, clientHeight } = document.documentElement;

    window.scrollTo({
      top: scrollTop + clientHeight,
    });
  }
}
