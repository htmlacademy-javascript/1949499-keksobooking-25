import '../../pristine/pristine.min.js';

import {
  validateMinPrice,
  validateMaxPrice,
  MAX_PRICE,
} from '../form/validator/validators/price-validator.js';

const sliderElement = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('#price');

const adForm = document.querySelector('.ad-form');
const price = adForm.querySelector('#price');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

pristine.addValidator(
  price,
  validateMaxPrice,
  `Максимальное значение ${MAX_PRICE}`
);

pristine.addValidator(
  price,
  validateMinPrice,
  'Слишком низкая стоимость'
);

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  priceField.value = Number(sliderElement.noUiSlider.get()).toFixed(0);
  pristine.validate();
});

priceField.addEventListener('change', () => {
  sliderElement.noUiSlider.set(priceField.value);
});

export {
  sliderElement
};
