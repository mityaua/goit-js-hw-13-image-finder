import axios from 'axios';

const url = 'https://pixabay.com/api/';
const key = '20008538-9b5c20cc133cf43381bf6ef09';

export default {
  searchQuery: '',
  page: 1,
  perPage: 12,
  async fetchImages() {
    const { data } = await axios.get(
      `${url}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.perPage}&key=${key}`,
    );

    this.incrementPage();

    return data;
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },

  get query() {
    return this.searchQuery;
  },

  set query(value) {
    this.searchQuery = value;
  },
};