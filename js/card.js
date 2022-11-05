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


// Создает карточку с объявлением
const createCard = ({ author, offer }) => {
  const cardElement = cardTemplate.cloneNode(true);

  // Подставляет пользовательские данные в карточку
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} '₽/ночь'`;
  cardElement.querySelector('.popup__type').textContent = typesTranslation[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${getCase(offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${offer.guests} ${getCase(offer.guests, ['гостя', 'гостей', 'гостей'])}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  // Проверяет, есть ли у объявления особенности (features), если да - добавляет все перечисленные пользователем особенности в карточку, если нет - блок с особенностями скрывается
  const featuresList = cardElement.querySelector('.popup__features');
  const featureItems = featuresList.querySelectorAll('.popup__feature');
  if (offer.features && offer.features.length) {
    const modifiers = offer.features.map((feature) => `popup__feature--${feature}`);
    featureItems.forEach((featureItem) => {
      const modifier = featureItem.classList[1];
      if (!modifiers.includes(modifier)) {
        featureItem.remove();
      }
    });
  } else {
    featuresList.remove();
  }

  // Проверяет, есть ли у объявления описание (description), если да - добавляет пользовательский текст в карточку, если нет - блок с описание скрывается
  if (offer.description && offer.description.length) {
    cardElement.querySelector('.popup__description').textContent = offer.description;
  } else {
    cardElement.querySelector('.popup__description').remove();
  }

  // Проверяет, есть ли у объявления фотографии (photos), если да - добавляет все имеющиеся фото в карточку, если нет - блок с фотографиями скрывается
  const photosList = cardElement.querySelector('.popup__photos');
  const photoItem = photosList.querySelector('.popup__photo');
  if (offer.photos && offer.photos.length) {
    photosList.innerHTML = '';
    offer.photos.forEach((photo) => {
      const photoElement = photoItem.cloneNode(true);
      photoElement.src = photo;
      photoElement.alt = offer.title;
      photosList.append(photoElement);
    });
  } else {
    photosList.remove();
  }

  return cardElement;
};

// Отрисовывает карточку объявления в блоке для вставки карты
map.append(createCard(createAdverts()[0]));
