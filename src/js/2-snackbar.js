import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  inputEl: document.querySelector('input'),
  btn: document.querySelector('button'),
  radios: document.querySelectorAll('input[type="radio"]'),
};

// Навешиваем событие на радиокнопки для изменения цвета кнопки при выборе
refs.radios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.checked) {
      refs.btn.classList.add('active');
    }
  });
});

refs.btn.addEventListener('click', e => {
  e.preventDefault();

  const selectedRadio = document.querySelector('[type="radio"]:checked');
  if (!selectedRadio) {
    iziToast.error({
      message: 'Пожалуйста, выберите состояние (fulfilled или rejected)',
      position: 'topRight',
    });
    return;
  }

  const radioValue = selectedRadio.value;
  const delay = Number(refs.inputEl.value);

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioValue === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  })
    .then(message => {
      iziToast.show({
        message,
        position: 'topRight',
        color: 'green',
      });
    })
    .catch(message => {
      iziToast.show({
        message,
        position: 'topRight',
        color: 'red',
      });
    });
});
