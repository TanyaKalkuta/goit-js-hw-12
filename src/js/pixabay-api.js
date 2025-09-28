import axios from 'axios';

const KEY = '52375997-ed6a7f09fc050a8946ebeea10';
const BASE_URL = 'https://pixabay.com/api/';

export const getImagesByQuery = query => {
  return axios
    .get(BASE_URL, {
      params: {
        key: KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
      },
    })
    .then(response => {
      console.log(response.data.hits);
      return response.data.hits; // масив картинок
    })
    .catch(error => {
      // не логувати нотифікації тут — обробляти у main.js
      // пробросимо помилку далі
      throw error;
    });
};
