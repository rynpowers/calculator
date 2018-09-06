class Calculator {
  constructor() {
    this.stack = [];
    this.storedFn = '';
    this.active = false;
  }
  run() {
    this.active = true;
    let b = this.stack.pop();
    let a = this.stack.pop();
    this.stack = [this.storedFn(a, b)];
  }

  push(val) {
    if (typeof val !== 'number') return;
    if (this.stack.length === 2) throw new Error('max capacity');
    this.stack.push(val);
    if (this.stack.length === 2 && this.storedFn) this.run();
  }

  setFn(name) {
    this.storedFn = this.operators[name];
  }

  value() {
    return this.stack[0];
  }

  clear() {
    this.stack = [];
    this.storedFn = '';
    this.active = false;
  }
}

Calculator.prototype.operators = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  div: (a, b) => a / b,
  mul: (a, b) => a * b,
};

export default Calculator;
