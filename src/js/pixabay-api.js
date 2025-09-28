import axios from 'axios';

const KEY = '52375997-ed6a7f09fc050a8946ebeea10';
const BASE_URL = 'https://pixabay.com/api/';

export const getImagesByQuery = async (query, page) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: page,
      },
    });
    return response.data; // object
  } catch (error) {
    throw error;
  }
};
