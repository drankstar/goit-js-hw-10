import SlimSelect from 'slim-select';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

// new SlimSelect({
//   select: '#single',
// });

const refs = {
  select: document.querySelector('#single'),
};

refs.select.addEventListener('change', selectBreed);

function selectBreed(e) {
  fetchCatByBreed(e.target.value).then(resp => {
    console.log(resp);
  });
}

fetchBreeds().then(({ data }) => {
  const breeds = data
    .map(option => `<option value=${option.id}>${option.name}</option>`)
    .join('');

  refs.select.insertAdjacentHTML('afterbegin', breeds);
});
