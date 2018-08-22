const calculator = (function() {
  function Calculator() {
    this.stack = [];
    this.storedFn = null;
  }

  Calculator.prototype.operators = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    div: (a, b) => a / b,
    mul: (a, b) => a * b,
  };

  Calculator.prototype.run = function() {
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
    return this.stack.length ? this.stack[0] : 0;
  };
  Calculator.prototype.clear = function() {
    this.stack = [];
    this.storedFn = null;
  };

  return { Calculator };
})();
