const inputNumbers = document.querySelectorAll('.timer-unput__number');
const buttons = document.querySelector('.timer-btn');
const hr = document.querySelector('#hr');
const min = document.querySelector('#min');
const sec = document.querySelector('#sec');
const arrTime = [];

console.log(inputNumbers);
buttons.addEventListener('click', e => {
  if (e.target.closest('#start')) {
    addNumberArr(inputNumbers);
    let time = arrTime[0] * 60 * 60 + arrTime[1] * 60 + arrTime[2];
    let timeInterval = setInterval(() => {
      arrTime[2] = time % 60;
      arrTime[1] = Math.trunc((time / 60) % 60);
      arrTime[0] = Math.trunc((time / 60 / 60) % 60);
      if (time >= 0) {
        hr.innerHTML = arrTime[0] >= 10 ? arrTime[0] : `0${arrTime[0]}`;
        min.innerHTML = arrTime[1] >= 10 ? arrTime[1] : `0${arrTime[1]}`;
        sec.innerHTML = arrTime[2] >= 10 ? arrTime[2] : `0${arrTime[2]}`;
      } else {
        clearInterval(timeInterval);
        console.log('stop');
      }
      --time;
      console.log(arrTime);
    }, 1000);
  }

  if (e.target.closest('#stop')) {
    clearInterval(timeInterval);
  }
});

//Функция проверки и добавления в массив
function addNumberArr(arrInput) {
  arrInput.forEach(e => {
    if (e.value > 0) {
      e.value <= 60 ? arrTime.push(parseInt(e.value)) : arrTime.push(60);
    } else {
      arrTime.push(0);
    }
    e.value = '';
  });
}
