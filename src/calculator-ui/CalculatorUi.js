const array = s => Array.from(document.querySelectorAll(s));
const elem = s => document.querySelector(s);

class UI {
  constructor() {
    this.elements = {
      buttons: array('.btn'),
      operators: array('.btn.btn-op'),
      numbers: array('.btn.btn-num'),
      execute: elem('.btn.btn-execute'),
      clear: elem('.btn.btn-clear'),
      screen: elem('.screen'),
      plusMinus: elem('.btn.btn-plusMinus'),
      percent: elem('.btn.btn-percent'),
    };
  }

  setScreen(fn, val) {
    this.elements.screen.value = typeof val === 'string' ? val : fn(val);
  }

  setActiveFn(name) {
    this.elements.operators.forEach(item => {
      item.value === name
        ? item.classList.add('active')
        : item.classList.remove('active');
    });
  }
}

export default UI;
