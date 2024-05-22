import { fetchImages, resetPage, incrementPage } from './js/pixabay-api.js';
import {
  renderImages,
  showErrorToast,
  renderLoader,
  toggleLoadMoreBtn,
  appendImages,
  clearGallery,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.load-more');
let keyword = '';

form.addEventListener('submit', async event => {
  event.preventDefault();

  keyword = searchInput.value.trim();

  if (keyword === '') {
    showErrorToast('Please enter a search term.');
    return;
  }

  searchInput.value = '';

  resetPage();
  clearGallery();
  toggleLoadMoreBtn(false);

  const loader = renderLoader();

  try {
    const data = await fetchImages(keyword);
    renderImages(data.hits);
    toggleLoadMoreBtn(data.totalHits > data.hits.length);
    loader.remove();
  } catch (error) {
    loader.remove();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  incrementPage();

  try {
    const data = await fetchImages(keyword);
    appendImages(data.hits);

    const cardHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (data.totalHits <= document.querySelectorAll('.gallery-item').length) {
      toggleLoadMoreBtn(false);
      showErrorToast(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error);
    showErrorToast('Failed to load more images');
  }
});
