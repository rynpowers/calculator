const { Calculator } = calculator;

describe('calculator', () => {
  let calc = new Calculator();
  it('should create a new calculator object', () => {
    expect(typeof calc).toBe('object');
    expect(calc.constructor.name).toBe('Calculator');
  });

  it('should have a stack property initialized to empty array', () => {
    expect(calc.hasOwnProperty('stack')).toBe(true);
    expect(Array.isArray(calc.stack)).toBe(true);
    expect(calc.stack.length).toBe(0);
  });

  it('should have all methods on constructor function prototype', () => {
    ['operators', 'push', 'value', 'clear', 'setFn'].forEach(item => {
      expect(calc.hasOwnProperty(item)).toBe(false);
      expect(calc.constructor.prototype.hasOwnProperty(item)).toBe(true);
    });
  });

  describe('operators', () => {
    let a;
    let b;
    beforeEach(() => {
      [a, b] = [6, 2];
    });
    it('should add 2 numbers', () => {
      expect(typeof calc.operators.add).toBe('function');
      expect(calc.operators.add(a, b)).toBe(8);
    });
    it('should subtract 2 numbers', () => {
      expect(typeof calc.operators.sub).toBe('function');
      expect(calc.operators.sub(a, b)).toBe(4);
    });
    it('should multiply 2 numbers', () => {
      expect(typeof calc.operators.mul).toBe('function');
      expect(calc.operators.mul(a, b)).toBe(12);
    });
    it('should divide 2 numbers', () => {
      expect(typeof calc.operators.div).toBe('function');
      expect(calc.operators.div(a, b)).toBe(3);
    });
  });

  describe('push, setFn, value, clear, run', () => {
    let pushCalc;

    beforeEach(() => {
      pushCalc = new Calculator();
      pushCalc.push(2);
      pushCalc.setFn('add');
    });
    describe('push', () => {
      it('should push items into the stack', () => {
        expect(pushCalc.stack.length).toBe(1);
        expect(pushCalc.stack[0]).toBe(2);
      });
    });
    describe('setFn', () => {
      it('should accept a string as an argument and store an operation function', () => {
        expect(pushCalc.storedFn.name).toBe('add');
        pushCalc.setFn('sub');
        expect(pushCalc.storedFn.name).toBe('sub');
        pushCalc.setFn('div');
        expect(pushCalc.storedFn.name).toBe('div');
        pushCalc.setFn('mul');
        expect(pushCalc.storedFn.name).toBe('mul');
      });
    });
    describe('value', () => {
      it('should return 0 if the stack is emnpty', () => {
        expect(calc.value()).toBe(0);
      });
      it('should return the value at the 0th index if the stack is not empty', () => {
        expect(pushCalc.value()).toBe(2);
      });
    });
    describe('clear', () => {
      it('should clear the stack and stored function prop', () => {
        pushCalc.clear();
        expect(pushCalc.stack.length).toBe(0);
        expect(pushCalc.storedFn).toBe('');
      });
    });
    describe('run', () => {
      it('should run stored function on 2 items in the stack', () => {
        spyOn(pushCalc, 'storedFn');
        pushCalc.push(6);
        expect(pushCalc.storedFn).toHaveBeenCalled();
        expect(pushCalc.storedFn).toHaveBeenCalledWith(2, 6);
      });
      it('should store return value at 0th index of the stack and reduce length to 1', () => {
        pushCalc.push(6);
        expect(pushCalc.value()).toBe(8);
        expect(pushCalc.stack.length).toBe(1);
      });
    });
  });
  describe('functionality', () => {
    beforeEach(() => {
      calc = new Calculator();
    });
    it('should store a max of 3 values', () => {
      calc.push(1);
      calc.push(2);
      expect(calc.push.bind(calc, 3)).toThrow('max capacity');
      expect(calc.stack.length).toBe(2);
    });

    it('should keep track of the total', () => {
      calc.push(1);
      calc.setFn('add');
      calc.push(2);
      expect(calc.value()).toBe(3);
      calc.push(3);
      expect(calc.value()).toBe(6);
      calc.setFn('mul');
      calc.push(4);
      expect(calc.value()).toBe(24);
      calc.setFn('div');
      calc.push(4);
      expect(calc.value()).toBe(6);
      calc.setFn('sub');
      calc.push(6);
      expect(calc.value()).toBe(0);
    });
  });
});
