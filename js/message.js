const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');
const body = document.querySelector('body');

const onErrorButtonClick = () => {
  hideMessage();
};

const onOverlayClick = () => {
  hideMessage();
};

const onEscKeydown = (evt) => {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    hideMessage();
  }
};

const showSuccessMessage = () => {
  document.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onEscKeydown);
  body.append(successMessage);
};

const showErrorMessage = () => {
  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onEscKeydown);
  body.append(errorMessage);
};

function hideMessage () {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  document.removeEventListener('click', onErrorButtonClick);
  document.removeEventListener('click', onOverlayClick);
  document.removeEventListener('keydown', onEscKeydown);
}

export {showSuccessMessage, showErrorMessage};
