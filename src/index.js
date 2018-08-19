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
  this.stack.push(val);
  if (this.stack.length === 2) this.run();
};
Calculator.prototype.setFn = function(name) {
  this.storedFn = this.operators[name];
};
Calculator.prototype.value = function() {};
Calculator.prototype.clear = function() {};
