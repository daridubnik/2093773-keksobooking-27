import { setActiveAdFormState } from './page-state.js';
import { addPhotoInputsListeners } from './preload-images.js';
import { initSlider } from './slider.js';

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const MAX_PRICE = 100000;
const NUMBER_OF_GUESTS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const adForm = document.querySelector('.ad-form');
const titleField = adForm.querySelector('#title');
const typeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const roomNumberField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');
const timeInField = adForm.querySelector('#timein');
const timeOutField = adForm.querySelector('#timeout');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'text-help',
});

Pristine.addMessages('ru', {
  required: 'Обязательное поле',
});

Pristine.setLocale('ru');

// Валидация заголовка
const validateTitle = (value) => value.length >= MIN_LENGTH_TITLE && value.length <= MAX_LENGTH_TITLE;
const getTitleErrorMessage = () => `От ${MIN_LENGTH_TITLE} до ${MAX_LENGTH_TITLE} символов`;

// Валидация цены
const validatePrice = (value) => value >= MIN_PRICE[typeField.value] && value <= MAX_PRICE;
const getPriceErrorMessage = () =>
  `За выбранный тип жилья минимальная цена ${MIN_PRICE[typeField.value]}, максимальная цена ${MAX_PRICE}`;


// Валидация вместимости гостей
const validateCapacity = () => NUMBER_OF_GUESTS[roomNumberField.value].includes(capacityField.value);
const getCapacityErrorMessage = () => {
  if (roomNumberField.value === '100') {
    return 'Не для гостей';
  }
  return `Указанное количество комнат вмещает ${NUMBER_OF_GUESTS[roomNumberField.value].join(', ')} ${roomNumberField.value === '1' ? 'гостя' : 'гостей'}`;
};

const addAdFormValidation = () => {
  pristine.addValidator(titleField, validateTitle, getTitleErrorMessage);
  pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);
  pristine.addValidator(capacityField, validateCapacity, getCapacityErrorMessage);
};

const addAdFormListeners = (onSuccessCallback, onErrorCallback) => {
  addPhotoInputsListeners();
  typeField.addEventListener('change', () => {
    priceField.placeholder = MIN_PRICE[typeField.value];
    pristine.validate(priceField);
  });

  timeInField.addEventListener('change', () => {
    timeOutField.value = timeInField.value;
  });

  timeOutField.addEventListener('change', () => {
    timeInField.value = timeOutField.value;
  });

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {}
  });
};

const addAdFormAction = (onSuccessCallback, onErrorCallback) => {
  setActiveAdFormState();
  addAdFormValidation();
  initSlider();
  addAdFormListeners(onSuccessCallback, onErrorCallback);
};

export { addAdFormAction };
