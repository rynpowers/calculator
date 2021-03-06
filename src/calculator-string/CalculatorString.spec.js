import CalcString from './CalculatorString';

describe('calculator string', () => {
  let calcStr;
  beforeEach(() => {
    calcStr = new CalcString();
  });

  it('should add number to the end of the string', () => {
    calcStr.add('1');
    calcStr.add('2');
    calcStr.add('3');
    expect(calcStr.getCalcString()).toBe('123');
  });

  it('should return type number when no argument is given', () => {
    expect(calcStr.getCalcString()).toBe('0');
    calcStr.add('1');
    calcStr.add('2');
    expect(calcStr.getCalcString()).toBe('12');
  });

  it('should add commas to the number', () => {
    calcStr.add('1');
    calcStr.add('0');
    calcStr.add('0');
    calcStr.add('0');
    calcStr.add('0');
    calcStr.add('0');
    calcStr.add('0');
    expect(calcStr.getCalcString()).toBe('1,000,000');
  });
  it('should add decimals', () => {
    calcStr.add('.');
    expect(calcStr.getCalcString()).toBe('0.');
    calcStr.add('1');
    calcStr.add('2');
    calcStr.add('3');
    expect(calcStr.getCalcString()).toBe('0.123');

    calcStr = new CalcString();

    calcStr.add('1');
    calcStr.add('2');
    calcStr.add('.');
    calcStr.add('2');
    calcStr.add('3');
    expect(calcStr.getCalcString()).toBe('12.23');
  });
  it('should add one decimal', () => {
    calcStr.add('.');
    calcStr.add('.');
    expect(calcStr.getCalcString()).toBe('0.');

    calcStr = new CalcString();

    calcStr.add('1');
    calcStr.add('2');
    calcStr.add('3');
    calcStr.add('.');
    calcStr.add('4');
    calcStr.add('5');
    calcStr.add('.');
    calcStr.add('6');
    calcStr.add('7');
    calcStr.add('8');
    calcStr.add('9');
    expect(calcStr.getCalcString()).toBe('123.456789');
  });
  it('should add decimals and commas', () => {
    calcStr.add('1');
    calcStr.add('0');
    calcStr.add('0');
    calcStr.add('0');
    calcStr.add('.');
    calcStr.add('4');
    calcStr.add('5');
    expect(calcStr.getCalcString()).toBe('1,000.45');

    calcStr = new CalcString();

    calcStr.add('1');
    calcStr.add('0');
    calcStr.add('0');
    calcStr.add('0');
    calcStr.add('0');
    calcStr.add('0');
    calcStr.add('0');
    calcStr.add('0');
    calcStr.add('.');
    calcStr.add('5');
    calcStr.add('5');
    calcStr.add('5');
    calcStr.add('5');
    calcStr.add('5');
    expect(calcStr.getCalcString()).toBe('10,000,000.55555');
  });
  it('should reset the calculor number string', () => {
    calcStr.add('1');
    calcStr.add('0');
    calcStr.add('0');
    calcStr.reset();
    expect(calcStr.getCalcString()).toBe('0');
    expect(calcStr.num.length).toBe(0);
    expect(calcStr.dec.length).toBe(0);
    expect(calcStr.decimal.length).toBe(0);
  });
  it('should return correct value and type', () => {
    expect(calcStr.getNumber()).toBe(0);
    calcStr.add('1');
    calcStr.add('0');
    calcStr.add('0');
    calcStr.add('0');
    expect(calcStr.getNumber()).toBe(1000);
    calcStr.add('.');
    expect(calcStr.getNumber()).toBe(1000);
    calcStr.add('1');
    calcStr.add('2');
    calcStr.add('3');
    expect(calcStr.getNumber()).toBe(1000.123);
    expect(typeof calcStr.getNumber()).toBe('number');

    calcStr.reset();

    calcStr.add('.');
    calcStr.add('.');
    expect(calcStr.getNumber()).toBe(0);
    calcStr.add('0');
    expect(calcStr.getNumber()).toBe(0);
  });
  it('should create a calc string object from input number', () => {
    calcStr.setCalcString(1000);
    expect(calcStr.getCalcString()).toBe('1,000');
    calcStr.setCalcString(0);
    expect(calcStr.getCalcString()).toBe('0');
    calcStr.setCalcString(0.2345);
    expect(calcStr.getCalcString()).toBe('0.2345');
    calcStr.setCalcString(1000.2345);
    expect(calcStr.getCalcString()).toBe('1,000.2345');
    calcStr.setCalcString(10000000.2345);
    expect(calcStr.getCalcString()).toBe('10,000,000.2345');
  });
  it('should handle negative numbers', () => {
    calcStr.setCalcString(-1000.025);
    expect(calcStr.getCalcString()).toBe('-1,000.025');
  });
});
