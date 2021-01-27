// Импорт шаблона для списка стран
import galleryTpl from '../templates/gallery-item.hbs';
import alert from './notify';
import { galleryRef } from './refs';

// Функция, обновляющая выдачу изображений
function updateGallery(hits) {
  const markup = galleryTpl(hits);

  if (hits.length === 0) {
    alert({
      type: 'notice',
      text: 'Nothing found ☹',
      delay: 2000,
      width: '300px',
      maxTextHeight: null,
    });
  }

  galleryRef.insertAdjacentHTML('beforeend', markup);
}

// Экспорт функции во внешний код
export default updateGallery;
