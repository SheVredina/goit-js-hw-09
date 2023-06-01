import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const inputEl = document.getElementById('datetime-picker');

const refs = {
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('[data-start]'),
};
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    refs.startBtn.disabled = false;
    refs.startBtn.addEventListener('click', () => {
      countDownTimer.start();
    });
    const countDownTimer = {
      start() {
        const startTime = new Date(selectedDates);

        setInterval(() => {
          const currentTime = Date.now();
          const deltaTime = startTime - currentTime;
          const time = convertMs(deltaTime);
          updateClockface(time);
        }, 1000);
      },
    };
  },
};

// if (deltaTime < 0) {
//   window.alert ('"Please choose a date in the future"'),
//   refs.startBtn.disabled = true;

flatpickr(inputEl, options);

function convertMs(deltaTime) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(deltaTime / day));
  const hours = addLeadingZero(Math.floor((deltaTime % day) / hour));
  const minutes = addLeadingZero(
    Math.floor(((deltaTime % day) % hour) / minute)
  );
  const seconds = addLeadingZero(
    Math.floor((((deltaTime % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = `${days}`;
  refs.hoursEl.textContent = `${hours}`;
  refs.minutesEl.textContent = `${minutes}`;
  refs.secondsEl.textContent = `${seconds}`;
}
