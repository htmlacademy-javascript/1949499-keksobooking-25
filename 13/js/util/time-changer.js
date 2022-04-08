const adForm = document.querySelector('.ad-form');

const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const changeTimeHandler = (actual) => {
  timeIn.value = actual;
  timeOut.value = actual;
};

timeIn.addEventListener('change', () => changeTimeHandler(timeIn.value));

timeOut.addEventListener('change', () => changeTimeHandler(timeOut.value));
