import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const inputDelay = document.querySelector('[name="delay"]');


form.addEventListener("submit", onCreatePromise);

function onCreatePromise(e) {
  e.preventDefault();
    const delay = Number(inputDelay.value);
    const inputState = document.querySelector('[name="state"]:checked');
   
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (inputState.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
        }, delay);
    });
    
    myPromise.then(delay => {
        iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        messageColor: '#FFFFFF',
        backgroundColor: '#59a10d',
        position: 'topRight',
        });
        
    }).catch(delay => {
          iziToast.show({
        message:`❌ Rejected promise in ${delay}ms`,
        messageColor: '#FFFFFF',
        backgroundColor: '#ef4040',
        position: 'topRight',
        });
    });
 
}