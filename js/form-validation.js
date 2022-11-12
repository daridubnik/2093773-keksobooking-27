const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};
const MAX_PRICE = 100000;
const NUMBER_OF_GUESTS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
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
  errorTextClass: 'text-help'
});

Pristine.addMessages('ru', {
  required: 'Обязательное поле'
});
Pristine.setLocale('ru');

// Валидация заголовка
const validateTitle = (value) => value.length >= MIN_LENGTH_TITLE && value.length <= MAX_LENGTH_TITLE;
const getTitleErrorMessage = () => `От ${MIN_LENGTH_TITLE} до ${MAX_LENGTH_TITLE} символов`;

pristine.addValidator(titleField, validateTitle, getTitleErrorMessage);

// Валидация цены
const validatePrice = (value) => value >= MIN_PRICE[typeField.value] && value <= MAX_PRICE;
const getPriceErrorMessage = () => `За выбранный тип жилья минимальная цена ${MIN_PRICE[typeField.value]}, максимальная цена ${MAX_PRICE}`;

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

// Изменяет плейсхолдер цены в зависимости от выбранного типа жилья
typeField.addEventListener('change', () => {
  priceField.placeholder = MIN_PRICE[typeField.value];
  pristine.validate(priceField);
});

// Валидация вместимости гостей
const validateСapacity = () => NUMBER_OF_GUESTS[roomNumberField.value].includes(capacityField.value);
const getСapacityErrorMessage = () => {
  if (roomNumberField.value === '100') {
    return 'Не для гостей';
  }
  return `Указанное количество комнат вмещает ${NUMBER_OF_GUESTS[roomNumberField.value].join(', ')} ${roomNumberField.value === '1' ? 'гостя' : 'гостей'}`;
};

pristine.addValidator(capacityField, validateСapacity, getСapacityErrorMessage);

// Проверяет форму на валидность
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

// Изменяет значение поля въезда/выезда в зависимости от выбранного значения в поле выезда/заезда
timeInField.addEventListener('change', () => {
  timeOutField.value = timeInField.value;
});

timeOutField.addEventListener('change', () => {
  timeInField.value = timeOutField.value;
});

