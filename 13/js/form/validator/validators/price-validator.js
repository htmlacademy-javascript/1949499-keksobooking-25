import '../../../../pristine/pristine.min.js';

const BUNGALOW_PRICE = 0;
const DEFAULT = 100001;
const FLAT_PRICE = 1000;
const HOTEL_PRICE = 3000;
const HOUSE_PRICE = 5000;
const PALACE_PRICE = 10000;
const MAX_PRICE = 100000;

const adForm = document.querySelector('.ad-form');
const price = adForm.querySelector('#price');
const typeAd = adForm.querySelector('#type');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

const getMinPrice = (type) => {
  switch (type) {
    case 'flat':
      return FLAT_PRICE;
    case 'bungalow':
      return BUNGALOW_PRICE;
    case 'house':
      return HOUSE_PRICE;
    case 'palace':
      return PALACE_PRICE;
    case 'hotel':
      return HOTEL_PRICE;
    default:
      return DEFAULT;
  }
};

const validateMaxPrice = (value) => value <= MAX_PRICE;

const validateMinPrice = (value) => value >= getMinPrice(typeAd.value);

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

price.addEventListener('change', () => pristine.validate());

typeAd.addEventListener('change', () => pristine.validate());

export {
  validateMaxPrice,
  validateMinPrice,
  MAX_PRICE,
};
