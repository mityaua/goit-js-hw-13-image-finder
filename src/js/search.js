import debounce from 'lodash/debounce';
import apiService from './apiService';
import updateGallery from './update-gallery';
import LoadMoreBtn from './components/load-more-btn';
import alert from './plugins/notify';
import scrollToTop from './plugins/scroll-to-top';
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
      type: 'info',
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

// Fetch
async function fetchGallery() {
  loadMoreBtn.disabled();

  try {
    const images = await apiService.fetchImages();

    if (images.total === 0) {

      return alert({
        type: 'notice',
        text: 'Nothing found ☹',
        delay: 2000,
        width: '300px',
        maxTextHeight: null,
      });
    }

    if (
      images.total > apiService.perPage &&
      images.hits.length >= apiService.perPage
    ) {
      loadMoreBtn.show();
      loadMoreBtn.enable();
    } else {
      loadMoreBtn.hide();
    }

    updateGallery(images);

    scrollToTop();
  } catch (error) {
    console.log(error);
  }
}

// Clear content
function clearContainer() {
  galleryRef.innerHTML = '';
}

// Intersection observer (test)
// const onEntry = entries => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting && apiService.query !== '') {
//       fetchGallery();
//     }
//   });
// };

// const observer = new IntersectionObserver(onEntry, {
//   rootMargin: '150px',
// });

// observer.observe(inter);
