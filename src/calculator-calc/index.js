const calculator = (function() {
  function Calculator() {
    this.stack = [];
    this.storedFn = '';
    this.active = false;
  }

  Calculator.prototype.operators = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    div: (a, b) => a / b,
    mul: (a, b) => a * b,
  };

  Calculator.prototype.run = function() {
    this.active = true;
    let b = this.stack.pop();
    let a = this.stack.pop();
    this.stack = [this.storedFn(a, b)];
  };

  Calculator.prototype.push = function(val) {
    if (this.stack.length === 2) throw new Error('max capacity');
    this.stack.push(val);
    if (this.stack.length === 2 && this.storedFn) this.run();
  };
  Calculator.prototype.setFn = function(name) {
    this.storedFn = this.operators[name];
  };
  Calculator.prototype.value = function() {
    return this.stack.length && this.active ? this.stack[0] : null;
  };
  Calculator.prototype.clear = function() {
    this.stack = [];
    this.storedFn = '';
    this.active = false;
  };

  return { Calculator };
})();
