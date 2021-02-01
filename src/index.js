import debounce from 'lodash/debounce';
import alert from './js/notify';

import apiService from './js/apiService';
import updateGallery from './js/update-gallery';
import LoadMoreBtn from './js/components/load-more-btn';

import './js/back-to-top';
import './js/lightbox';
import './scss/main.scss';

import 'material-design-icons/iconfont/material-icons.css';

import { formRef, inputRef, galleryRef } from './js/refs';

const loadMoreBtn = new LoadMoreBtn('#load-btn');

// Listeners
inputRef.addEventListener('input', debounce(searchFormHandler, 1000));
formRef.addEventListener('submit', event => {
  event.preventDefault();
});
loadMoreBtn.refs.button.addEventListener('click', fetchGallery);

// Search
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

// Fetch & render
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

// Clear content
function clearContainer() {
  galleryRef.innerHTML = '';
}

// Scroll content
function scrollToTop() {
  if (galleryRef.children.length > apiService.perPage) {
    const { scrollTop, clientHeight } = document.documentElement;

    window.scrollTo({
      top: scrollTop + clientHeight,
    });
  }
}
