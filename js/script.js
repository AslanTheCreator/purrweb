const buttonForm = document.querySelector('.send-form__submit');
const elementForm = document.querySelectorAll('.send-form__element');
const cookie = document.querySelector('.cookies');
const cookieBtn = document.querySelector('.cookies-btn');
const downloadImg = document.querySelector('.download-item');

let isFill;

buttonForm.addEventListener('click', () => {
  elementForm.forEach((element) => {
    if (element.validity.valueMissing) {
      isFill = true;
    }
  });
  if (isFill) {
    elementForm.forEach((element) => (element.style.borderColor = '#ff0000'));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => cookie.classList.add('cookies__show'), 1000);
});

cookieBtn.addEventListener('click', () => cookie.classList.remove('cookies__show'));
