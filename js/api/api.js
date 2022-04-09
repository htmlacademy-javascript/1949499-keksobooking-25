const getData = (onSuccess, onError) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(onError);
};

const sendData = (onResult, body) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking', {
      method: 'POST',
      body,
    }, )
    .then(() => onResult('success'))
    .catch(() => onResult('error'));
};

export {
  getData,
  sendData
};
