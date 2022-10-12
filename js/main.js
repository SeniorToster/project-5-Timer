const inputNumbers = document.querySelectorAll('.timer-unput__number');
const inputWrapper = document.querySelector('.timer-unput');
const buttons = document.querySelector('.timer-btn');
const hr = document.querySelector('#hr');
const min = document.querySelector('#min');
const sec = document.querySelector('#sec');
const circleHr = hr.parentNode.querySelector('.segment');
const circleMin = min.parentNode.querySelector('.segment');
const circleSec = sec.parentNode.querySelector('.segment');
let arrTime = [0, 0, 0];
console.log(arrTime);
if (localStorage.time) {
  arrTime = JSON.parse(localStorage.time);
  time(arrTime);
}
console.log(arrTime);

inputWrapper.addEventListener('input', e => {
  valueVerify(e);
});

buttons.addEventListener('click', e => {
  if (e.target.closest('#start')) {
    addNumberArr(inputNumbers, arrTime);
    time(arrTime);
  }

  if (e.target.closest('#stop')) {
    clearInterval(timeInterval);
  }

  if (e.target.closest('#reset')) {
    clearInterval(timeInterval);
    arrTime.fill(0);
    renderTimer(0, 0, 0);
    localStorage.time = JSON.stringify(arrTime);
  }
});

//Функция проверки инпута
function valueVerify(e) {
  const warning = document.querySelector('.timer-box__warning');
  const btnStart = buttons.querySelector('.timer-btn__text_start');
  value = e.target.value;
  if (e.target.closest('#input-hr')) {
    if (24 < value || 0 >= value) {
      btnStart.id = 'close';
      warning.style.opacity = '1';
      warning.textContent = 'Допустимое максимальное число: 24';
    } else {
      btnStart.id = 'start';
      warning.style.opacity = '0';
    }
  } else {
    if (60 < value || 0 >= value) {
      btnStart.id = 'close';
      warning.style.opacity = '1';
      warning.textContent = 'Допустимое максимальное число: 60';
    } else {
      btnStart.id = 'start';
      warning.style.opacity = '0';
    }
  }
}

//Функция проверки и добавления в массив
function addNumberArr(arrInput, arrNum) {
  //проверка массива, если массив не пустой - сбросить таймер
  arrNum.filter(e => e == 0).length !== 3 && clearInterval(timeInterval);

  //проверка на пустые импуты, если все 3 пустые закончить функцию
  let valueNull = 0;
  arrInput.forEach(e => e.value == '' && ++valueNull);

  if (valueNull == 3) {
    return;
  } else {
    arrInput.forEach((e, i) => {
      e.value == '' ? (arrNum[i] = 0) : (arrNum[i] = parseInt(e.value));
      e.value = '';
    });
  }
}

//Функция таймера
function time(arrNum) {
  let h = arrNum[0];
  let m = arrNum[1];
  let s = arrNum[2];
  let time = h * 60 * 60 + m * 60 + s;

  timeInterval = setInterval(() => {
    s = time % 60;
    m = Math.trunc((time / 60) % 60);
    h = Math.trunc((time / 60 / 60) % 60);

    arrTime.splice(0, 3, h, m, s);
    localStorage.time = JSON.stringify(arrNum);

    renderTimer(h, m, s);
    if (time <= 0) {
      clearInterval(timeInterval);
      alert('Время истекло!');
      return;
    }
    --time;
  }, 1000);
}

//Функция рендер таймера
function renderTimer(h, m, s) {
  hr.innerHTML = h >= 10 ? h : `0${h}`;
  min.innerHTML = m >= 10 ? m : `0${m}`;
  sec.innerHTML = s >= 10 ? s : `0${s}`;
  circleHr.style.strokeDasharray = `${h * 2.5} 60`;
  circleMin.style.strokeDasharray = `${m} 60`;
  circleSec.style.strokeDasharray = `${s} 60`;
}
