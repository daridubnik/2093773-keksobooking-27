import {showAlert} from './util.js';

const GET_DATA = 'https://27.javascript.pages.academy/keksobooking/data';
const SEND_DATA = 'https://27.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(GET_DATA)
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      showAlert('Произошла ошибка при загрузке данных с сервера');
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(SEND_DATA,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export { getData, sendData };
