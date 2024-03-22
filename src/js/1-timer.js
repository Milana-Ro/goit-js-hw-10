import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const dateInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button');
const values = [...document.querySelectorAll('.value')];

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onCloseFoo,
};
const datePicker = flatpickr(dateInput, options);
let userSelectedDate;
// console.log(userSelectedDate);

function onCloseFoo(selectedDates) {
  userSelectedDate = selectedDates[0];
  //   console.log(selectedDates[0]);

  if (Date.parse(userSelectedDate) < Date.now()) {
    // console.log(' no no no');
    showAlert();
    startButton.disabled = true;
  } else {
    // console.log('yes yes');
    startButton.disabled = false;
  }
}

startButton.addEventListener('click', onStartTimerClick);

function onStartTimerClick() {
  const timerID = setInterval(() => {
    const diffTime = userSelectedDate - Date.now();
    console.log(diffTime);
    if (diffTime <= 0) {
      //   console.log('off time');
      clearInterval(timerID);
      startButton.disabled = false;
      dateInput.disabled = false;
      return;
    }
    startButton.disabled = true;
    dateInput.disabled = true;
    convertMs(diffTime);
    // console.log(convertMs(diffTime));
    const [daysValue, hoursValue, minutesValue, secondsValue] = values;
    console.log((secondsValue.textContent = '?????? хз що тут підставляти'));
  }, 1000);
}

function addLeadingZero(value) {
  value.padStart(2, '0');
}
function showAlert() {
  iziToast.show({
    message: 'Please choose a date in the future',
    color: 'red',
    position: 'topRight',
  });
}

// task 1
// виводити час в спани

// task 2
// зробити кнопку неактивною при першому завантаженні

//task 3
// refactoring
