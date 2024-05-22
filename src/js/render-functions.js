import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

export function renderLoader() {
  gallery.innerHTML = '';
  const section = document.querySelector('section');
  const loader = document.createElement('span');
  loader.classList.add('loader');
  section.appendChild(loader);
  return loader;
}

export function renderImages(images) {
  images.forEach(image => {
    const imageLink = document.createElement('a');
    imageLink.classList.add('gallery-item');
    imageLink.href = image.largeImageURL;
    imageLink.dataset.lightbox = 'gallery';

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;
    img.loading = 'lazy';
    imageLink.appendChild(img);

    const overlay = document.createElement('ul');
    overlay.classList.add('overlay');

    const imageProperties = [
      { label: 'Likes', value: image.likes },
      { label: 'Views', value: image.views },
      { label: 'Comments', value: image.comments },
      { label: 'Downloads', value: image.downloads },
    ];

    imageProperties.forEach(property => {
      const listItem = document.createElement('li');
      listItem.classList.add('desc');
      listItem.innerHTML = `<p>${property.label}</p><p class="info">${property.value}</p>`;
      overlay.appendChild(listItem);
    });

    imageLink.appendChild(overlay);

    gallery.appendChild(imageLink);
  });

  const lightbox = new SimpleLightbox('.gallery-item', {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });

  if (typeof SimpleLightbox !== 'undefined') {
    lightbox.refresh();
  }
}

export function showErrorToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}

export function appendImages(images) {
  renderImages(images);
}

export function toggleLoadMoreBtn(visibility) {
  loadMoreBtn.style.display = visibility ? 'inline-block' : 'none';
}

export function clearGallery() {
  gallery.innerHTML = '';
}
