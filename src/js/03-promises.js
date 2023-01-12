function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

const refs = {
  formEl: document.querySelector('.form'),
};

refs.formEl.addEventListener('submit', event => {
  event.preventDefault;
  const delay = event.target.elements.delay.value;
  const step = event.target.elements.step.value;
  const amount = event.target.elements.amount.value;
});
