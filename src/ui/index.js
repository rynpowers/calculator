const UI = (function() {
  const array = s => Array.from(document.querySelectorAll(s));
  const item = s => document.querySelector(s);

  const ui = {
    buttons: array('.btn'),
    operators: array('.btn.btn-op'),
    numbers: array('.btn.btn-num'),
    execute: item('.btn.btn-execute'),
    clear: item('.btn.btn-clear'),
    screen: item('.screen'),
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
