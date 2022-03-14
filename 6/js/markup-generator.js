import {
  getRentOffers
} from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card');
const offers = getRentOffers(10);

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
      return 'Неизвестно';
  }
}

function getPhotos(photos, card){
  const resultFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const popupPhoto = card.querySelector('.popup__photo').cloneNode(true);
    popupPhoto.src = photo;
    resultFragment.appendChild(popupPhoto);
  });
  return resultFragment;
}

function getFeatures(features, card){
  const featureContainer = card.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');
  const modifiers = features.map((feature) => `popup__feature--${feature}`);

  featureList.forEach((featureListItem) => {
    const modifier = featureListItem.classList[1];

    if(!modifiers.includes(modifier)){
      featureListItem.remove();
    }
  });
}

function setOffer(data, template) {
  const card = template.content.cloneNode(true);
  card.querySelector('.popup__title').textContent = data.title;
  card.querySelector('.popup__text--address').textContent = data.address;
  card.querySelector('.popup__text--price').content = `${data.price }<span>₽/ночь</span>`;
  card.querySelector('.popup__type').textContent = getType(data.type);
  card.querySelector('.popup__text--capacity').textContent = `${data.rooms } комнаты для ${ data.guests } гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${ data.checkin }, выезд до ${ data.checkout}`;
  getFeatures(data.features, card);
  card.querySelector('.popup__description').textContent = data.description;
  card.querySelector('.popup__photos').replaceChild(getPhotos(data.photos, card), card.querySelector('.popup__photo'));
  return card;
}

function createOffers(data, card){
  const inputFragments = [];
  data.forEach((element, i) => {
    inputFragments[i] = document.createDocumentFragment();
    inputFragments[i].appendChild(setOffer(data[i].offer, card));
    inputFragments[i].querySelector('.popup__avatar').src = data[i].author.avatar;
  });
  return inputFragments;
}

const adv = createOffers(offers, cardTemplate);
mapCanvas.appendChild(adv[6]);
