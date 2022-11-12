import {createAdverts} from './data.js';
import {createCard} from './card.js';
import {setInactivePageSate} from './page-state.js';
import {addAdFormAction} from './add-form-action.js';

setInactivePageSate();
addAdFormAction();

// Находит блок для вставки карточки с объявлением
const map = document.querySelector('#map-canvas');

// Отрисовывает карточку объявления в блоке для вставки карты
map.append(createCard(createAdverts()[0]));
