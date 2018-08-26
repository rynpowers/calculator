const uiObject = (function() {
  const array = s => Array.from(document.querySelectorAll(s));
  const elem = s => document.querySelector(s);

  function UI() {
    this.elements = {
      buttons: array('.btn'),
      operators: array('.btn.btn-op'),
      numbers: array('.btn.btn-num'),
      execute: elem('.btn.btn-execute'),
      clear: elem('.btn.btn-clear'),
      screen: elem('.screen'),
    };
  }

  UI.prototype.setScreen = function(val) {
    this.elements.screen.value = val;
  };

  UI.prototype.setActiveFn = function(name) {
    this.elements.operators.forEach(item => {
      item.value === name
        ? item.classList.add('active')
        : item.classList.remove('active');
    });
  };

  return {
    UI,
  };
})();
