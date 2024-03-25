import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);
function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const delay = formData.get('delay');
  const state = formData.get('state');

  createPromise(delay, state)
    .then(resolveDelay => showSuccessNotification(resolveDelay))
    .catch(rejectDelay => showErrorNotification(rejectDelay));

  form.reset();
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        return resolve(delay);
      }
      return reject(delay);
    }, delay);
  });
}

// HELPERS //

function showSuccessNotification(delay) {
  iziToast.show({
    message: `✅ Fulfilled promise in ${delay}ms`,
    messageColor: '#fff',
    messageLineHeight: '150%',
    backgroundColor: '#59a10d',
    position: 'topRight',
  });
}
function showErrorNotification(delay) {
  iziToast.show({
    message: `❌ Rejected promise in ${delay}ms`,
    messageColor: '#fff',
    messageLineHeight: '150%',
    backgroundColor: '#ef4040',
    position: 'topRight',
  });
}
