import { setActiveAdFormState } from './page-state.js';
import { addPhotoInputsListeners } from './preload-images.js';
import { initSlider, onTypeFieldChange, onPriceFieldChange, resetSlider } from './slider.js';
import { resetMap } from './init-map.js';
import { clearImageBlocks } from './preload-images.js';
import { sendData } from './api.js';

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
const formFilter = document.querySelector('.map__filters');
const titleField = adForm.querySelector('#title');
const typeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const roomNumberField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');
const timeInField = adForm.querySelector('#timein');
const timeOutField = adForm.querySelector('#timeout');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');

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

const validateTitle = (value) => value.length >= MIN_LENGTH_TITLE && value.length <= MAX_LENGTH_TITLE;
const getTitleErrorMessage = () => `От ${MIN_LENGTH_TITLE} до ${MAX_LENGTH_TITLE} символов`;

const validatePrice = (value) => value >= MIN_PRICE[typeField.value] && value <= MAX_PRICE;
const getPriceErrorMessage = () =>
  `За выбранный тип жилья минимальная цена ${MIN_PRICE[typeField.value]}, максимальная цена ${MAX_PRICE}`;


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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetForm = () => {
  adForm.reset();
  formFilter.reset();
  resetSlider();
  resetMap();
  clearImageBlocks();
  const customEvent = new CustomEvent('change');
  formFilter.dispatchEvent(customEvent);
};

const addAdFormListeners = (onSuccess, onError) => {
  addPhotoInputsListeners();
  typeField.addEventListener('change', (evt) => {
    onTypeFieldChange(evt);
    priceField.placeholder = MIN_PRICE[typeField.value];
    pristine.validate(priceField);
  });

  priceField.addEventListener('change', () => {
    onPriceFieldChange();
  });

  timeInField.addEventListener('change', () => {
    timeOutField.value = timeInField.value;
  });

  timeOutField.addEventListener('change', () => {
    timeInField.value = timeOutField.value;
  });

  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  });

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          resetForm();
          unblockSubmitButton();
        },
        () => {
          onError();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

const addAdFormAction = (onSuccess, onError) => {
  setActiveAdFormState();
  addAdFormValidation();
  initSlider();
  addAdFormListeners(onSuccess, onError);
};

export { addAdFormAction };
