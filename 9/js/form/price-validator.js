import '../../pristine/pristine.min.js';

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

function getMinPrice(type) {
  const FLAT_PRICE = 1000;
  const BUNGALOW_PRICE = 0;
  const HOUSE_PRICE = 5000;
  const PALACE_PRICE = 10000;
  const HOTEL_PRICE = 3000;
  const DEFAULT = 1000;

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
}

function validateMaxPrice(value) {
  const MAX_PRICE = 100000;
  return value <= MAX_PRICE;
}

function validateMinPrice(value) {
  return value >= getMinPrice(typeAd.value);
}

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

price.addEventListener('change', () => {
  pristine.validate();
});

typeAd.addEventListener('change', () => {
  pristine.validate();
});


export {
  validateMaxPrice,
  validateMinPrice
};
