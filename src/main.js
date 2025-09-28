import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="search-text"]');
const searchBtn = document.querySelector('#search-btn');

if (!form) {
  console.error('Search form not found in DOM (expected #search-form).');
}

// Обробник сабміту (без async/await)
form.addEventListener('submit', e => {
  e.preventDefault();

  const query = input.value.trim();
  if (!query) {
    iziToast.warning({ title: 'Увага', message: 'Введіть пошукове слово.' });
    return;
  }

  // Очищаємо попередні результати
  clearGallery();

  // Показуємо лоадер
  showLoader();
  searchBtn.disabled = true;

  // виконуємо запит (getImagesByQuery повертає response.data)
  getImagesByQuery(query)
    .then(images => {
      // data — об'єкт відповіді Pixabey: { total, totalHits, hits: [...] }

      if (!images || images.length === 0) {
        iziToast.show({
          message: `Sorry, there are no images matching your search query. Please try again!`,
          backgroundColor: 'pink',
          position: 'topRight',
          close: false,
          messageSize: '20',
          timeout: 5000,
          icon: '<svg class="icon icon-x-circle"><use xlink:href="#icon-x-circle"></use></svg>',
          maxWidth: 900,
        });
        return;
      }

      // Інакше — створюємо галерею
      createGallery(images);

      // повідомлення про кількість знайдених
      iziToast.success({
        title: 'Готово',
        message: `Знайдено ${images.length} зображень.`,
      });
    })
    .catch(err => {
      // показуємо помилку
      console.error('Fetch error:', err);
      iziToast.error({
        title: 'Помилка',
        message: 'Проблема при завантаженні зображень. Спробуйте пізніше.',
        backgroundColor: 'red',
        position: 'topRight',
        close: false,
        messageSize: '30',
        timeout: 5000,
      });
    })
    .finally(() => {
      hideLoader();
      searchBtn.disabled = false;
    });
  form.reset();
});
