const refs = {
  btnStartEl: document.querySelector('button[data-start]'),
  btnStopEl: document.querySelector('button[data-stop]'),
  bodyEl: document.querySelector('body'),
};

let timerId = null;
refs.btnStopEl.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function makeBackgroundColor () {
let color = getRandomHexColor();
    refs.bodyEl.style.backgroundColor = color;
}

const onBtnStart = () => {
  refs.btnStopEl.disabled = false;
  refs.btnStartEl.disabled = true;
  makeBackgroundColor();
  timerId = setInterval(() => makeBackgroundColor(), 1000);
}


 const onBtnStop = (() => {
  clearInterval(timerId);
  refs.btnStopEl.disabled = true;
  refs.btnStartEl.disabled = false;
});

refs.btnStartEl.addEventListener('click', onBtnStart);
refs.btnStopEl.addEventListener('click', onBtnStop);
