// Импорт шаблона для списка стран
import galleryTpl from '../templates/gallery-item.hbs';
// import alert from './notify';
import { galleryRef } from './refs';

// Функция, обновляющая выдачу изображений
function updateGallery(hits) {
  const markup = galleryTpl(hits);

  galleryRef.insertAdjacentHTML('beforeend', markup);
}

// Экспорт функции во внешний код
export default updateGallery;
