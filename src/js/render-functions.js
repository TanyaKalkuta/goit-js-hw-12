import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// DOM селектори (приклад)
const galleryContainer = document.querySelector('#gallery');
const loaderEl = document.querySelector('#loader');

const lightbox = new SimpleLightbox('#gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  spinner: true,
});

export function createGallery(images) {
  // images — масив елементів (наприклад, hits з pixabay)
  if (!galleryContainer) return;

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
  <a class="gallery-link" href='${largeImageURL}'>
    <img
    loading="lazy"
      class="gallery-image"
      src="${webformatURL}"
      alt="${tags}"
    />
      </a>
     <ul class="stats">
                <li class="stats-item">
                    <p class="stats-title">Likes</p>
                    <p class="stat-content">${likes}</p>
                </li>
                <li class="stats-item">
                    <p class="stats-title">Views</p>
                    <p class="stat-content">${views}</p>
                </li>
                <li class="stats-item">
                    <p class="stats-title">Comments</p>
                    <p class="stat-content">${comments}</p>
                </li>
                <li class="stats-item">
                    <p class="stats-title">Downloads</p>
                    <p class="stat-content">${downloads}</p>
                </li>
            </ul>
</li>`
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  // оновлюємо SimpleLightbox (рефреш)
  lightbox.refresh();
}

export function clearGallery() {
  if (!galleryContainer) return;
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  if (!loaderEl) return;
  loaderEl.classList.add('is-active'); // в CSS покажи .is-active
}

export function hideLoader() {
  if (!loaderEl) return;
  loaderEl.classList.remove('is-active');
}

//Ця функція нічого не приймає, повинна додавати клас для відображення кнопки Load more. Нічого не повертає.
export function showLoadMoreButton() {
  loadMoreBtn.classList.add('is-active');
}
//  hideLoadMoreButton(). Ця функція нічого не приймає, повинна прибирати клас для відображення кнопки Load more. Нічого не повертає.
export function hideLoadMoreButton() {
  loadMoreBtn.classList.remove('is-active');
}
