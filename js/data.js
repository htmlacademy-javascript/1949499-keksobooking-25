import {
  getRand,
  getRandElement,
  getRandSequence,
} from './util.js';

const TITLES = [
  'Сдам квартиру',
  'Посуточная сдача',
  'Удобные апартаменты',
  'Комфортное жилье',
  'Срочно сдам',
  'Комфортабельный номер',
  'Переночевать недорого',
  'Сдается дом',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Отличная квартира с видом на центр города!',
  'Свежий ремонт, солнечная сторона дома',
  'Удобная квартира, с хорошей транспортной доступностью',
  'Выгодное расположение по отношению к экскурсионным объектам',
  'Принимаем гостей с животными. Есть все необходимое для размещения с маленькими детьми',
  'Солнечная квартира с прекрасным видом из окна на море',
  'Рядом расположено кафе с приятной атмосферой и демократичными ценами',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.',
];

function createOffer() {
  return {
    title: getRandElement(TITLES),
    address: '',
    price: getRand(0, 100000),
    type: getRandElement(TYPES),
    rooms: getRand(0, 10),
    guests: '',
    checkin: getRandElement(TIMES),
    checkout: getRandElement(TIMES),
    features: getRandSequence(FEATURES),
    description: getRandElement(DESCRIPTIONS),
    photos: getRandSequence(PHOTOS),
  };
}

function createLocation() {
  return {
    lat: getRand(35.65000, 35.70000, 5),
    lng: getRand(139.70000, 139.80000, 5),
  };
}

function createAnnouncement() {
  return {
    author: {},
    offer: createOffer(),
    location: createLocation(),
  };
}

const MAX_SINGLE_FIGURE = 9;

function addMissingValues(objects) {
  for (let i = 0; i < objects.length; i++) {
    objects[i].author.avatar = 'img/avatars/user';
    if (i < MAX_SINGLE_FIGURE) {
      objects[i].author.avatar += '0';
    }
    objects[i].author.avatar += `${String(i + 1)  }.png`;
    objects[i].offer.address += `${String(objects[i].location.lat)  }, ${  String(objects[i].location.lng)}`;
    objects[i].offer.guests = objects[i].offer.rooms;
  }
}

function getRentOffers() {
  const offers = Array.from({
    length: 10
  }, createAnnouncement);
  addMissingValues(offers);
  return offers;
}

export {
  getRentOffers
};
