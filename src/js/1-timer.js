import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button');
const timerNodes = [...document.querySelectorAll('.value')];

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onCloseDatePicker,
};

flatpickr(dateInput, options);
let userSelectedDate;
setDisabledStartButton();

function onCloseDatePicker(selectedDates) {
  userSelectedDate = Date.parse(selectedDates[0]);

  if (userSelectedDate <= Date.now()) {
    showAlert();
    setDisabledStartButton();
  } else {
    setDisabledStartButton(false);
  }
}

startButton.addEventListener('click', onStartTimerClick);

function onStartTimerClick() {
  const timer = setInterval(() => {
    const timeDifference = userSelectedDate - Date.now();

    if (timeDifference <= 0) {
      clearInterval(timer);
      setDisabledStartButton(false);
      dateInput.disabled = false;
      return;
    }
    setDisabledStartButton();
    dateInput.disabled = true;

    const convertedDate = convertMs(timeDifference);
    renderTime(convertedDate);
  }, 1000);
}
function renderTime(dateObject) {
  const { days, hours, minutes, seconds } = dateObject;
  const [daysNode, hoursNode, minutesNode, secondsNode] = timerNodes;

  daysNode.textContent = addLeadingZero(days);
  hoursNode.textContent = addLeadingZero(hours);
  minutesNode.textContent = addLeadingZero(minutes);
  secondsNode.textContent = addLeadingZero(seconds);
}

// HELPERS //

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
function showAlert() {
  iziToast.show({
    message: 'Please choose a date in the future',
    messageColor: '#fff',
    messageLineHeight: '150%',
    backgroundColor: '#ef4040',
    position: 'topRight',
  });
}

function setDisabledStartButton(flag = true) {
  startButton.disabled = flag;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
