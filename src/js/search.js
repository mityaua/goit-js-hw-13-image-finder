import debounce from 'lodash/debounce';
import apiService from './apiService';
import updateGallery from './update-gallery';
import alert from './plugins/notify';
import LoadMoreBtn from './components/load-more-btn';
import scrollToTop from './plugins/scroll-to-top'
import { formRef, inputRef, galleryRef } from './references/refs';

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

  // Asyns & await need, try catch (починить условие)
  apiService.fetchImages().then(images => {
    if (images.total === 0) {
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