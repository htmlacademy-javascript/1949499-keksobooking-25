function getType(type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
    default:
      return '';
  }
}

function checkData() {
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] === undefined) {
      return false;
    }
  }
  return true;
}

function getPhotos(photos, card) {
  const resultFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const popupPhoto = card.querySelector('.popup__photo').cloneNode(true);
    popupPhoto.src = photo;
    resultFragment.appendChild(popupPhoto);
  });
  return resultFragment;
}

function getFeatures(features, card) {
  const featureContainer = card.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');
  if (checkData(features)) {
    const modifiers = features.map((feature) => `popup__feature--${feature}`);

    featureList.forEach((featureListItem) => {
      const modifier = featureListItem.classList[1];

      if (!modifiers.includes(modifier)) {
        featureListItem.remove();
      }
    });
  } else {
    featureList.forEach((featureListItem) => {
      featureListItem.remove();
    });
  }
}


function setOffer(data, template) {
  const card = template.content.cloneNode(true);
  card.querySelector('.popup__title').textContent = data.title;
  if (checkData(data.address)) {
    card.querySelector('.popup__text--address').textContent = data.address;
  } else {
    card.querySelector('.popup__text--address').textContent = '';
  }

  if (checkData(data.price)) {
    card.querySelector('.popup__text--price').innerHTML = `${data.price}<span> ₽/ночь</span>`;
  } else {
    card.querySelector('.popup__text--price').innerHTML = '';
  }

  card.querySelector('.popup__type').textContent = getType(data.type);

  if (checkData(data.rooms, data.guests)) {
    card.querySelector('.popup__text--capacity').textContent = `${data.rooms } комнаты для ${ data.guests } гостей`;
  } else {
    card.querySelector('.popup__text--capacity').textContent = '';
  }

  if (checkData(data.checkin, data.checkout)) {
    card.querySelector('.popup__text--time').textContent = `Заезд после ${ data.checkin }, выезд до ${ data.checkout}`;
  } else {
    card.querySelector('.popup__text--time').textContent = '';
  }
  getFeatures(data.features, card);
  card.querySelector('.popup__description').textContent = data.description;
  if (checkData(data.photos)) {
    card.querySelector('.popup__photos').replaceChild(getPhotos(data.photos, card), card.querySelector('.popup__photo'));
  } else {
    card.querySelector('.popup__photos').innerHTML = '';
  }
  return card;
}

function createOffer(data, card) {
  const inputFragment = document.createDocumentFragment();
  inputFragment.appendChild(setOffer(data.offer, card));
  inputFragment.querySelector('.popup__avatar').src = data.author.avatar;
  return inputFragment;
}

export {
  createOffer
};
