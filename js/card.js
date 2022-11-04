import { createAdverts } from './data.js';
import { getCase } from './util.js';

const map = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const typesTranslation = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const createCard = ({ author, offer }) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} '₽/ночь'`;
  cardElement.querySelector('.popup__type').textContent = typesTranslation[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${getCase(offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${offer.guests} ${getCase(offer.guests, ['гостя', 'гостей', 'гостей'])}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  return cardElement;
};

map.append(createCard(createAdverts()[0]));
