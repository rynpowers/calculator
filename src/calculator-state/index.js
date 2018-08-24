const calculatorState = (function() {
  function CalcState() {
    this.state = {};
  }
  CalcState.prototype.createState = function(obj) {
    Object.keys(obj).forEach(key => {
      this.state[key] = { value: obj[key], func: [] };
    });
  };

  CalcState.prototype.connect = function(obj) {
    Object.keys(obj).forEach(key => {
      let { func } = this.state[key];
      func.push(...obj[key]);
    });
  };

  CalcState.prototype.update = function(...args) {
    args.forEach(key => {
      let { func, value } = this.state[key];
      func.forEach(f => f(value));
    });
  };

  CalcState.prototype.setState = function(prop, val) {
    this.state[prop].value = val;
  };

  CalcState.prototype.getState = function(prop) {
    return this.state[prop].value;
  };

  return { CalcState };
})();
