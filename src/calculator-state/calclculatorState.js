const calculatorState = (function() {
  function CalcState() {
    this.state = {
      num: '',
      total: 0,
      selectedFn: '',
      power: false,
      display: '',
    };

    this.update = [];
    this.send = [];
  }

  CalcState.prototype.connect = function(prop, ...args) {
    if (prop === 'send' || prop === 'update') this[prop].push(...args);
  };

  CalcState.prototype.updateState = function() {
    this.update.forEach(item => {
      this.state[item.prop] = item.fn();
    });

    this.send.forEach(item => {
      item.fn(this.state[item.prop]);
    });
  };

  return { CalcState };
})();
