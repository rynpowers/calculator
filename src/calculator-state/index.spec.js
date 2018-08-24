const { CalcState } = calculatorState;

let calcState;
let calc;
let numString;
let ui;

let state = new CalcState();

describe('calcState object', () => {
  beforeEach(() => {
    calcState = state;

    calc = {
      total: 0,
      add(n) {
        this.total += n;
      },
      getTotal() {
        return this.total;
      },
      setTotal(val) {
        this.total = val;
      },
      reset() {
        this.total = 0;
      },
    };

    numString = {
      num: '',
      add(n) {
        this.num = this.num + n;
      },
      getStr() {
        return this.num;
      },
      reset() {
        this.num = '';
      },
    };

    ui = {
      num: '',
      total: 0,
      setTotal(val) {
        this.total = val;
      },
      setNum(n) {
        this.num = n;
      },
    };

    let setTotal = ui.setTotal.bind(ui);
    let calcTotal = calc.setTotal.bind(calc);
    let setNum = ui.setNum.bind(ui);

    state.createState({
      num: '',
      total: 0,
    });

    state.connect({
      num: [setNum],
      total: [setTotal, calcTotal],
    });
  });
  it('should create a calcState objectt', () => {
    expect(typeof calcState).toBe('object');
  });
  it('should have all props and methods', () => {
    let calcPrototype = calcState.constructor.prototype;
    expect(calcState.state.hasOwnProperty('num')).toBe(true);
    expect(calcState.state.hasOwnProperty('total')).toBe(true);
    expect(calcPrototype.hasOwnProperty('connect')).toBe(true);
    expect(calcPrototype.hasOwnProperty('update')).toBe(true);
    expect(calcPrototype.hasOwnProperty('setState')).toBe(true);
    expect(calcPrototype.hasOwnProperty('createState')).toBe(true);
  });
  it('should update and send state', () => {
    calc.add(5);
    calc.add(10);
    numString.add('1');
    numString.add('2');
    expect(calc.getTotal()).toBe(15);
    expect(numString.getStr()).toBe('12');
    expect(calcState.state.total.value).not.toBe(15);
    expect(calcState.state.num.value).not.toBe('12');
    calcState.setState('num', numString.getStr());
    calcState.setState('total', calc.getTotal());
    expect(calcState.state.total.value).toBe(15);
    expect(calcState.state.num.value).toBe('12');
    calcState.update('total', 'num');
    expect(ui.num).toBe('12');
    expect(ui.total).toBe(15);
    expect(calc.total).toBe(15);
  });
  it('should return state value', () => {
    calcState.setState('total', 10);
    expect(calcState.getState('total')).toBe(10);
  });
});
