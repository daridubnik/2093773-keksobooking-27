const adForm = document.querySelector('.ad-form');
const adFormFields = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersFields = mapFilters.querySelectorAll('select, fieldset');

// Перебирает коллекцию переданных элементов и блокирует/разблокирует элементы в зависимости от указанного состояния
const setStateElements = (elements, state) => elements.forEach((element) => {element.disabled = state;});

const setInactiveAdFormState = () => {
  adForm.classList.add('ad-form--disabled');
  setStateElements(adFormFields, true);
};

const setInactiveFilterFormState = () => {
  mapFilters.classList.add('map__filters--disabled');
  setStateElements(mapFiltersFields, true);
};

// Переключает страницу в неактивное состояние
const setInactivePageSate = () => {
  setInactiveAdFormState();
  setInactiveFilterFormState();
};

// Переключает форму в активное состояние
const setActiveAdFormState = () => {
  adForm.classList.remove('ad-form--disabled');
  setStateElements(adFormFields, false);
};

// Переключает фильтры на карте в активное состояние
const setActiveFilterFormState = () => {
  mapFilters.classList.remove('map__filters--disabled');
  setStateElements(mapFiltersFields, false);
};

export {setInactivePageSate, setActiveAdFormState, setActiveFilterFormState};

