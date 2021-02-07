import apiService from '../apiService';
import { galleryRef } from '../references/refs';

// Scroll to top button
export default function scrollToTop() {
  if (galleryRef.children.length > apiService.perPage) {
    const { scrollTop, clientHeight } = document.documentElement;

    window.scrollTo({
      top: scrollTop + clientHeight,
    });
  }
}