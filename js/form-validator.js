import '../pristine/pristine.min.js';

const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

function validateTitle(value){
  return value.length >=30 && value.length <= 100;
}

function validatePrice(value){
  return value <= 100000;
}

function getMaxGuests(value){
  if(value > 3){
    return 0;
  }
  return value;
}

function validateGuests(value){
  const max = getMaxGuests(adForm.querySelector('#room_number').value);
  if(max === 0 || Number(value) === 0){
    return max === Number(value);
  }
  return max >= value && value !== 0;
}

pristine.addValidator(adForm.querySelector('#title'), validateTitle, 'От 30 до 100 символов');
pristine.addValidator(adForm.querySelector('#price'), validatePrice, 'Максимальное значение 100 000');
pristine.addValidator(adForm.querySelector('#capacity'), validateGuests, 'Неверное число гостей');

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
