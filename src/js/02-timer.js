import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  btnStartEl: document.querySelector('button[data-start]'),
  daysToFinishEl: document.querySelector('[data-days]'),
  hoursToFinishEl: document.querySelector('[data-hours]'),
  minutesToFinishEl: document.querySelector('[data-minutes]'),
  secondsToFinishEl: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: selectedDates => onCloseDateTimePicker(selectedDates),
};

flatpickr('input#datetime-picker', options);

let selectedDate,
  timerId = null;

refs.btnStartEl.addEventListener('click', onStartButtonClick);
refs.btnStartEl.disabled = true;

function onCloseDateTimePicker(selectedDates) {
  selectedDate = selectedDates[0];
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    Notiflix.Report.failure('Please choose a date in the future');
    refs.btnStartEl.disabled = true;
  } else {
    refs.btnStartEl.disabled = false;
  }
}

function onStartButtonClick() {
  timerId = setInterval(() => countTime(), 1000);
  countTime();
}

function countTime() {
  const currentDate = new Date();
  const timeLeft = selectedDate - currentDate;

  if (timeLeft <= 0) {
    clearInterval(timerId);
  }

  updateTimerDisplay(Math.max(0, timeLeft));
}

function updateTimerDisplay(timeLeft) {
  const timeToFinish = convertMs(timeLeft);
  refs.daysToFinishEl.textContent = addLeadingZero(timeToFinish.days);
  refs.hoursToFinishEl.textContent = addLeadingZero(timeToFinish.hours);
  refs.minutesToFinishEl.textContent = addLeadingZero(timeToFinish.minutes);
  refs.secondsToFinishEl.textContent = addLeadingZero(timeToFinish.seconds);
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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
