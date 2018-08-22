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

    let total = calc.getTotal.bind(calc);
    let num = numString.getStr.bind(numString);
    let setTotal = ui.setTotal.bind(ui);
    let setNum = ui.setNum.bind(ui);

    state.connect(
      'update',
      { fn: total, prop: 'total' },
      { fn: num, prop: 'num' }
    );

    state.connect(
      'send',
      { fn: setTotal, prop: 'total' },
      { fn: setNum, prop: 'num' }
    );
  });
  it('should create a calcState objectt', () => {
    expect(typeof calcState).toBe('object');
  });
  it('should have all props and methods', () => {
    let calcPrototype = calcState.constructor.prototype;
    expect(calcState.state.hasOwnProperty('num')).toBe(true);
    expect(calcState.state.hasOwnProperty('total')).toBe(true);
    expect(calcState.state.hasOwnProperty('selectedFn')).toBe(true);
    expect(calcState.state.hasOwnProperty('power')).toBe(true);
    expect(calcPrototype.hasOwnProperty('connect')).toBe(true);
    expect(calcPrototype.hasOwnProperty('updateState')).toBe(true);
  });
  it('should update and send state', () => {
    calc.add(5);
    calc.add(10);
    numString.add('1');
    numString.add('2');
    expect(calc.getTotal()).toBe(15);
    expect(numString.getStr()).toBe('12');
    expect(calcState.state.total).not.toBe(15);
    expect(calcState.state.num).not.toBe('12');
    calcState.updateState();
    expect(calcState.state.total).toBe(15);
    expect(calcState.state.num).toBe('12');
    expect(ui.num).toBe('12');
    expect(ui.total).toBe(15);
  });
});
