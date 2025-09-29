import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="search-text"]');
const searchBtn = document.querySelector('#search-btn');
const loadMoreBtn = document.querySelector('#load-btn');

let currentQuery = ''; // — зберігає останній пошуковий запит.

let currentPage = 1;

if (!form) {
  console.error('Search form not found in DOM (expected #search-form).');
}

// Додаємо функцію для плавного скролу
function scrollGallery() {
  const firstCard = document.querySelector('.gallery li'); // перша картка
  if (firstCard) {
    const cardHeight = firstCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2, // прокручуємо на дві висоти картки
      behavior: 'smooth', // плавна прокрутка
    });
  }
}

// Обробник сабміту (без async/await)
form.addEventListener('submit', async e => {
  e.preventDefault();
  try {
    currentQuery = input.value.trim();
    if (!currentQuery) {
      iziToast.warning({ title: 'Увага', message: 'Введіть пошукове слово.' });
      return;
    }

    // Очищаємо попередні результати
    clearGallery();
    hideLoadMoreButton();
    currentPage = 1; // (обнуляєш, бо новий пошук).

    // Показуємо лоадер
    showLoader();
    searchBtn.disabled = true;

    // виконуємо запит (getImagesByQuery повертає response.data)
    const data = await getImagesByQuery(currentQuery, currentPage);
    // data — об'єкт відповіді Pixabey: { total, totalHits, hits: [...] }

    if (!data.hits || data.hits.length === 0) {
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
      hideLoadMoreButton();
      form.reset();
      return;
    }

    // Інакше — створюємо галерею
    createGallery(data.hits);

    if (currentPage * 15 < data.totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Кінець',
        message: 'Більше зображень немає.',
      });
    }

    // повідомлення про кількість знайдених
    iziToast.success({
      title: 'Готово',
      message: `Знайдено ${data.totalHits} зображень.`,
    });
  } catch (err) {
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
  } finally {
    hideLoader();
    searchBtn.disabled = false;
  }
  form.reset();
});

loadMoreBtn.addEventListener('click', async e => {
  e.preventDefault();
  currentPage += 1;
  try {
    // робимо кнопку неактивною під час завантаження
    hideLoadMoreButton();
    loadMoreBtn.disabled = true;
    // показуємо лоадер
    showLoader();

    const data = await getImagesByQuery(currentQuery, currentPage);
    // додаємо нові зображення
    createGallery(data.hits);

    // прокручуємо після додавання нових карток
    requestAnimationFrame(() => {
      scrollGallery();
    });

    if (currentPage * 15 < data.totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Кінець',
        message: 'Більше зображень немає.',
      });
    }
  } catch (error) {
    console.error('Fetch error:', error);
    iziToast.error({
      title: 'Помилка',
      message: 'Проблема при завантаженні зображень. Спробуйте пізніше.',
      backgroundColor: 'red',
      position: 'topRight',
      close: false,
      messageSize: '30',
      timeout: 5000,
    });
  } finally {
    hideLoader();
    // розблоковуємо кнопку (якщо вона видима, користувач зможе натиснути знову)
    loadMoreBtn.disabled = false;
  }
});
