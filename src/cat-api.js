import axios from 'axios';
const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
});

axios.defaults.headers.common['x-api-key'] =
  'live_LioM4GB2pn5dYu7p29tFSSZSF5qCVwoZKLgZev4IvMHsrSuHb6ex32QKaQtFoRUV';

export function fetchBreeds() {
  return api.get('/breeds');
}

export function fetchCatByBreed(value) {
  return api.get(`/images/search?breed_ids=${value}`);
}
