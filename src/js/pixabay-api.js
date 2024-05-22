import { showErrorToast } from './render-functions.js';
import axios from 'axios';

const apiKey = '43854622-acb16c386b106d84adf209c8f';
const perPage = 15;
let page = 1;

export async function fetchImages(keyword) {
  axios.defaults.baseURL = `https://pixabay.com`;
  const params = new URLSearchParams({
    key: apiKey,
    q: encodeURIComponent(keyword),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: perPage,
    page: page,
  });

  try {
    const response = await axios.get(`/api/`, { params });
    const data = response.data;

    if (data.hits.length === 0) {
      showErrorToast('No images found');
    }
    return data;
  } catch (error) {
    showErrorToast('Failed to fetch images');
    throw new Error(error.response.status);
  }
}

export function resetPage() {
  page = 1;
}

export function incrementPage() {
  page += 1;
}
