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

const TIME = [
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
const SIMILAR_AD_COUNT = 10;

// Возвращает случайное положительное число из заданного диапазона, вкл. пограничные значения; с указанием количества знаков после запятой (по умолчанию - целое число)
const getRandomPositiveNumber = (min, max, digits = 0) => {
  if (min < 0 || max < 0 || min === max) {
    return NaN;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return +(Math.random() * (max - min + 1) + min).toFixed(digits);
};

// Возвращает случайный элемент массива
const getRandomArrayElement = (array) => array[getRandomPositiveNumber(0, array.length - 1)];

// Возвращает случайную координату широты в заданном диапазоне
const getRandomLatitude = () =>
  getRandomPositiveNumber(LOCATION.MIN_LATITUDE, LOCATION.MAX_LATITUDE, 5);

// Возвращает случайную координа долготы в заданном диапозоне
const getRandomLongitude = () =>
  getRandomPositiveNumber(LOCATION.MIN_LONGITUDE, LOCATION.MAX_LONGITUDE, 5);

const createAuthor = (index) => ({
  avatar: `img/avatars/user${index.toString().padStart(2, '0')}.png`,
});

const createOffer = () => ({
  title: getRandomArrayElement(TITLES),
  address: `${getRandomLatitude()}, ${getRandomLongitude()}`,
  price: getRandomPositiveNumber(PRICE.MIN_PRICE, PRICE.MAX_PRICE),
  type: getRandomArrayElement(TYPES),
  rooms: getRandomPositiveNumber(ROOMS.MIN_ROOMS, ROOMS.MAX_ROOMS),
  guests: getRandomPositiveNumber(GUESTS.MIN_GUESTS, GUESTS.MAX_GUESTS),
  checkin: getRandomArrayElement(TIME),
  checkout: getRandomArrayElement(TIME),
  features: FEATURES.slice(0, getRandomPositiveNumber(0, FEATURES.length)),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: PHOTOS.slice(0, getRandomPositiveNumber(0, PHOTOS.length)),
});

const createLocation = () => ({
  lat: getRandomLatitude(),
  lng: getRandomLongitude(),
});

// Создает одно объявление
const createAd = (index) => ({
  author: createAuthor(index),
  offer: createOffer(),
  location: createLocation(),
});

// Создает массив из указанного количества объявлений
const similarAds = () =>
  Array.from({ length: SIMILAR_AD_COUNT }, (_, adIndex) => createAd(adIndex + 1));

similarAds();
