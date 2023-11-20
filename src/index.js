import SlimSelect from 'slim-select';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  select: document.querySelector('#single'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader-box'),
};

refs.select.addEventListener('change', selectBreed);

let breedsData;

function selectBreed(e) {
  if (e.target.value === '') return;
  refs.loader.classList.remove('hidden');
  refs.catInfo.classList.add('hidden');
  fetchCatByBreed(e.target.value)
    .then(resp => {
      const catInfo = breedsData.find(element => element.id === e.target.value);
      refs.catInfo.innerHTML = `
      <h2>${catInfo.name}</h2> 
      <img src=${resp.data[0].url} alt=${catInfo.name} />
      <p>${catInfo.description}</p>
      <p>${catInfo.temperament}</p>`;
      refs.catInfo.classList.remove('hidden');
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      refs.loader.classList.add('hidden');
    });
}

fetchBreeds()
  .then(({ data }) => {
    refs.select.classList.remove('hidden');

    const breeds = data
      .map(option => `<option value=${option.id}>${option.name}</option>`)
      .join('');

    refs.select.insertAdjacentHTML(
      'afterbegin',
      `<option value='' selected disabled > Choose your cat! </option>` + breeds
    );

    new SlimSelect({
      select: '#single',
    });
    breedsData = data;
  })
  .catch(error => {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  })
  .finally(() => {
    refs.loader.classList.add('hidden');
  });
