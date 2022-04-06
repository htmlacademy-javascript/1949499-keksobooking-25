import '../../../pristine/pristine.min.js';

import {
  validateGuests
} from './validators/guest-validator.js';

import {
  validateMinPrice,
  validateMaxPrice,
  MAX_PRICE,
} from './validators/price-validator.js';

import {
  validateTitle,
  MAX_LENGTH,
  MIN_LENGTH,
} from './validators/title-validator.js';

const adForm = document.querySelector('.ad-form');
const guestCount = adForm.querySelector('#capacity');
const title = adForm.querySelector('#title');
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
  guestCount,
  validateGuests,
  'Неверное число гостей'
);

pristine.addValidator(
  title,
  validateTitle,
  `От ${MIN_LENGTH} до ${MAX_LENGTH} символов`
);

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

export {
  pristine
};
