const url = 'https://pixabay.com/api/';
const key = '20008538-9b5c20cc133cf43381bf6ef09';
const perPage = 12;

function fetchImages(searchQuery, pageNumber) {
  return fetch(
    `${url}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=${perPage}&key=${key}`,
  )
    .then(res => res.json())
    .then(({ hits }) => hits)
    .catch(error => console.log(error));
}

// Экспорт функции во внешний код
export default fetchImages;
