import debounce from 'lodash/debounce';
import alert from './js/notify';

import './scss/main.scss';
import 'material-design-icons/iconfont/material-icons.css';

import apiService from './js/apiService';
import updateGallery from './js/updateGallery';
import LoadMoreBtn from './js/components/loadMoreBtn';

import { formRef, inputRef, galleryRef } from './js/refs';

const loadMoreBtn = new LoadMoreBtn('#load-btn');

// Слушатели событий
inputRef.addEventListener('input', debounce(searchFormHandler, 1000));
formRef.addEventListener('submit', event => {
  event.preventDefault();
});
loadMoreBtn.refs.button.addEventListener('click', fetchGalley);

function searchFormHandler(event) {
  apiService.query = event.target.value;

  if (apiService.query === '') {
    clearContainer();
    loadMoreBtn.hide();
    return alert({
      type: 'notice',
      text: 'Type the requested 🔎',
      delay: 2000,
      width: '300px',
      maxTextHeight: null,
    });
  }

  clearContainer();
  apiService.resetPage();
  fetchGalley();
}

function fetchGalley() {
  loadMoreBtn.disabled();

  apiService.fetchImages().then(images => {
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
    loadMoreBtn.show();
    loadMoreBtn.enable();

    console.log(galleryRef.scrollHeight);
    console.log(document.documentElement.offsetHeight);
    console.log(galleryRef.offsetTop);

    galleryRef.scrollIntoView();

      //  window.scrollTo({
      //    top: document.documentElement.offsetHeight,
      //  });

    // window.scrollTo({
    //   top: document.documentElement.offsetHeight - galleryRef.scrollHeight,
    // });
  });
}

// Очищает контент
function clearContainer() {
  galleryRef.innerHTML = '';
}
