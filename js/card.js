import {getCase} from './util.js';
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const typesTranslation = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

// Возвращает элемент с пользовательскими данными, если данных нет - удаляет элемент
const pasteCardText = (parent, cssClass, data, additionalText = '') => {
  const element = parent.querySelector(cssClass);
  if (!data) {
    element.remove();
    return;
  }
  element.textContent = `${data}${additionalText}`;
};

// Возвращает ссылку на аватар пользователя, если данных нет - удаляет аватар
const pasteAvatar = (parent, cssClass, data) => {
  const element = parent.querySelector(cssClass);
  if (!data) {
    element.remove();
    return;
  }
  element.src = data;
};

// Возвращает фото, загруженные пользователем, если данных нет - удаляет блок для фото
const pastePhotos = (parent, cssClass, data) => {
  const element = parent.querySelector(cssClass);
  if (!data.length) {
    element.remove();
    return;
  }
  const photoItem = element.querySelector('.popup__photo');
  element.innerHTML = '';
  data.forEach((item) => {
    const photoElement = photoItem.cloneNode(true);
    photoElement.src = item;
    element.append(photoElement);
  });
};


// Возвращает список особенностей, отмеченных пользователем, если данных нет - удаляет блок особенностей
const pasteFeatures = (parent, cssClass, data) => {
  const element = parent.querySelector(cssClass);
  if (!data.length) {
    element.remove();
    return;
  }
  const featureItems = element.querySelectorAll('.popup__feature');
  const modifiers = data.map((feature) => `popup__feature--${feature}`);
  featureItems.forEach((featureItem) => {
    const modifier = featureItem.classList[1];
    if (!modifiers.includes(modifier)) {
      featureItem.remove();
    }
  });
};

// Возвращает количество комнат/гостей, выбранное пользователем, если данных нет - удаляет блок вместимости
const createCapacityText = (dataRooms, dataGuests) => {
  if (!dataRooms && !dataGuests) {
    return '';
  }
  if (dataRooms && !dataGuests) {
    return `${dataRooms} ${getCase(dataRooms, ['комната', 'комнаты', 'комнат',])} `;
  }
  if (!dataRooms && dataGuests) {
    return `Для ${dataGuests} ${getCase(dataGuests, ['гостя', 'гостей', 'гостей'])}`;
  }
  if (dataRooms && dataGuests) {
    return `${dataRooms} ${getCase(dataRooms, ['комната', 'комнаты', 'комнат',])}
    для ${dataGuests} ${getCase(dataGuests, ['гостя', 'гостей', 'гостей'])}`;
  }
};

// Возвращает время заезда/выезда, выбранное пользователем, если данных нет - удаляет блок времени
const createTimeText = (dataTimeIn, dataTimeOut) => {
  if (!dataTimeIn && !dataTimeOut) {
    return '';
  }
  if (dataTimeIn && !dataTimeOut) {
    return `Заезд после ${dataTimeIn}`;
  }
  if (!dataTimeIn && dataTimeOut) {
    return `Выезд до ${dataTimeOut}`;
  }
  if (dataTimeIn && dataTimeOut) {
    return `Заезд после ${dataTimeIn}, выезд до ${dataTimeOut}`;
  }
};

// Создает карточку с объявлением
const createCard = ({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);
  pasteAvatar(cardElement, '.popup__avatar', author.avatar);
  pasteCardText(cardElement, '.popup__title', offer.title);
  pasteCardText(cardElement, '.popup__text--address', offer.address);
  pasteCardText(cardElement, '.popup__text--price', offer.price, ' ₽/ночь');
  pasteCardText(cardElement, '.popup__type', typesTranslation[offer.type]);
  pasteCardText(cardElement, '.popup__text--capacity', createCapacityText(offer.rooms, offer.guests));
  pasteCardText(cardElement, '.popup__text--time', createTimeText(offer.checkin, offer.checkout));
  pasteFeatures(cardElement, '.popup__features', offer.features);
  pasteCardText(cardElement, '.popup__description', offer.description);
  pastePhotos(cardElement, '.popup__photos', offer.photos);
  return cardElement;
};

export {createCard};
