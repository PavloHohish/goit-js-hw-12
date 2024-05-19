import { showErrorToast } from './render-functions.js';

export function fetchImages(keyword) {
  const apiKey = '43854622-acb16c386b106d84adf209c8f';
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    keyword
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        showErrorToast('No images found');
      }
      return data.hits;
    });
}
