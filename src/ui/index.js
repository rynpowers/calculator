const UI = (function() {
  const array = s => Array.from(document.querySelectorAll(s));
  const elem = s => document.querySelector(s);

  const ui = {
    buttons: array('.btn'),
    operators: array('.btn.btn-op'),
    numbers: array('.btn.btn-num'),
    execute: elem('.btn.btn-execute'),
    clear: elem('.btn.btn-clear'),
    screen: elem('.screen'),
    setScreen(val) {
      this.screen.value = val;
    },
    setActiveFn(name) {
      this.operators.forEach(item => {
        item.value === name
          ? item.classList.add('active')
          : item.classList.remove('active');
      });
    },
  };
  return {
    ui,
  };
})();
