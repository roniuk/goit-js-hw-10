import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.getElementById('datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const userDay = document.querySelector('span[data-days]');
const userHours = document.querySelector('span[data-hours]');
const userMinutes = document.querySelector('span[data-minutes]');
const userSeconds = document.querySelector('span[data-seconds]');

btnStart.disabled = true;
let userSelectedDate = null;
let diff = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        diff = userSelectedDate - Date.now();
        
        if (userSelectedDate <= Date.now()) {
        iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#FFFFFF',
        backgroundColor: '#B51B1B',
        position: 'topRight',
        });
            
        btnStart.disabled = true; 
            
        } else {
            btnStart.disabled = false;  
        }
  },
};

flatpickr(input, options);

btnStart.addEventListener("click", () => {
btnStart.disabled = true;
input.disabled = true;
    
let timerInterval = setInterval(() => {
    if (diff <= 0) {
      clearInterval(timerInterval);
    } else {
      onTimerStart(diff);
      diff -= 1000;
    }
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function onTimerStart(diff) {
  const timer = convertMs(diff);
  userDay.textContent = `${addLeadingZero(timer.days)}`;
  userHours.textContent = `${addLeadingZero(timer.hours)}`;
  userMinutes.textContent = `${addLeadingZero(timer.minutes)}`;
  userSeconds.textContent = `${addLeadingZero(timer.seconds)}`;
}