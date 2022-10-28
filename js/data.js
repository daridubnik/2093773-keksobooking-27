import {getRandomPositiveNumber, getRandomArrayElement} from './util.js';

const TITLES = [
  'Великолепный дворец',
  'Уютная квартира',
  'Просторный дом',
  'Скромное бунгало',
  'Комфортабельный отель',
];

const PRICE = {
  MIN_PRICE: 0,
  MAX_PRICE: 100000,
};

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const ROOMS = {
  MIN_ROOMS: 1,
  MAX_ROOMS: 100,
};

const GUESTS = {
  MIN_GUESTS: 1,
  MAX_GUESTS: 100,
};

const TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const DESCRIPTIONS = [
  'Великолепный 4-х этажный дворец с бассейном, садом и собственной охраной',
  'Уютная квартира в центре города рядом с кинотеатром',
  'Просторный дом, отлично подойдет для семей с детьми и животными',
  'Скромное бунгало с видом на горы ',
  'Комфортабельный отель с 3-х разовым питанием и еженедельной уборкой номера'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LOCATION = {
  MIN_LATITUDE: 35.65,
  MAX_LATITUDE: 35.7,
  MIN_LONGITUDE: 139.7,
  MAX_LONGITUDE: 139.8,
};

// Задает количество сгенерированных объявлений
const SIMILAR_ADVERT_COUNT = 10;

// Создает одно объявление
const createAdvert = (index) => {
  const location = {
    lat: getRandomPositiveNumber(LOCATION.MIN_LATITUDE, LOCATION.MAX_LATITUDE, 5),
    lng: getRandomPositiveNumber(LOCATION.MIN_LONGITUDE, LOCATION.MAX_LONGITUDE, 5),
  };

  return {
    author: {
      avatar: `img/avatars/user${index.toString().padStart(2, '0')}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomPositiveNumber(PRICE.MIN_PRICE, PRICE.MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveNumber(ROOMS.MIN_ROOMS, ROOMS.MAX_ROOMS),
      guests: getRandomPositiveNumber(GUESTS.MIN_GUESTS, GUESTS.MAX_GUESTS),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: FEATURES.slice(0, getRandomPositiveNumber(0, FEATURES.length)),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: PHOTOS.slice(0, getRandomPositiveNumber(0, PHOTOS.length)),
    },
    location,
  };
};

// Создает массив из указанного количества объявлений
const createAdverts = () =>
  Array.from({ length: SIMILAR_ADVERT_COUNT }, (_, advertIndex) => createAdvert(advertIndex + 1));

export {createAdverts};

