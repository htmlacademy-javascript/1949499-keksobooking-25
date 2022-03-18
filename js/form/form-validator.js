import '../../pristine/pristine.min.js';
import {
  validateGuests
} from './guest-validator.js';
import {
  validateMinPrice,
  validateMaxPrice
} from './price-validator.js';
import {
  validateTitle
} from './title-validator.js';
import './time-changer.js';

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
  'От 30 до 100 символов'
);

pristine.addValidator(
  price,
  validateMaxPrice,
  'Максимальное значение 100 000'
);

pristine.addValidator(
  price,
  validateMinPrice,
  'Слишком низкая стоимость'
);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
