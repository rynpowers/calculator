const { CalcString } = calcString;

describe('calculator string', () => {
  let calcStr;
  beforeEach(() => {
    calcStr = new CalcString();
  });

  it('should add number to the end of the string', () => {
    expect(calcStr.createCalcString('1')).toBe('1');
    expect(calcStr.createCalcString('2')).toBe('12');
    expect(calcStr.createCalcString('3')).toBe('123');
  });

  it('should return type number when no argument is given', () => {
    expect(calcStr.createCalcString()).toBe('0');
    expect(calcStr.createCalcString('1')).toBe('1');
    expect(calcStr.createCalcString('2')).toBe('12');
  });

  it('should add commas to the number', () => {
    expect(calcStr.createCalcString('1')).toBe('1');
    expect(calcStr.createCalcString('0')).toBe('10');
    expect(calcStr.createCalcString('0')).toBe('100');
    expect(calcStr.createCalcString('0')).toBe('1,000');
    expect(calcStr.createCalcString('0')).toBe('10,000');
    expect(calcStr.createCalcString('0')).toBe('100,000');
    expect(calcStr.createCalcString('0')).toBe('1,000,000');
  });
  it('should add decimals', () => {
    expect(calcStr.createCalcString('.')).toBe('0.');
    expect(calcStr.createCalcString('1')).toBe('0.1');
    expect(calcStr.createCalcString('2')).toBe('0.12');
    expect(calcStr.createCalcString('3')).toBe('0.123');

    calcStr = new CalcString();

    expect(calcStr.createCalcString('1')).toBe('1');
    expect(calcStr.createCalcString('2')).toBe('12');
    expect(calcStr.createCalcString('.')).toBe('12.');
    expect(calcStr.createCalcString('2')).toBe('12.2');
    expect(calcStr.createCalcString('3')).toBe('12.23');
  });
  it('should add one decimal', () => {
    expect(calcStr.createCalcString('.')).toBe('0.');
    expect(calcStr.createCalcString('.')).toBe('0.');

    calcStr = new CalcString();

    expect(calcStr.createCalcString('1')).toBe('1');
    expect(calcStr.createCalcString('2')).toBe('12');
    expect(calcStr.createCalcString('3')).toBe('123');
    expect(calcStr.createCalcString('.')).toBe('123.');
    expect(calcStr.createCalcString('4')).toBe('123.4');
    expect(calcStr.createCalcString('5')).toBe('123.45');
    expect(calcStr.createCalcString('.')).toBe('123.45');
    expect(calcStr.createCalcString('6')).toBe('123.456');
    expect(calcStr.createCalcString('7')).toBe('123.4567');
    expect(calcStr.createCalcString('8')).toBe('123.45678');
    expect(calcStr.createCalcString('9')).toBe('123.456789');
  });
  it('should add decimals and commas', () => {
    expect(calcStr.createCalcString('1')).toBe('1');
    expect(calcStr.createCalcString('0')).toBe('10');
    expect(calcStr.createCalcString('0')).toBe('100');
    expect(calcStr.createCalcString('0')).toBe('1,000');
    expect(calcStr.createCalcString('.')).toBe('1,000.');
    expect(calcStr.createCalcString('4')).toBe('1,000.4');
    expect(calcStr.createCalcString('5')).toBe('1,000.45');

    calcStr = new CalcString();

    expect(calcStr.createCalcString('1')).toBe('1');
    expect(calcStr.createCalcString('0')).toBe('10');
    expect(calcStr.createCalcString('0')).toBe('100');
    expect(calcStr.createCalcString('0')).toBe('1,000');
    expect(calcStr.createCalcString('0')).toBe('10,000');
    expect(calcStr.createCalcString('0')).toBe('100,000');
    expect(calcStr.createCalcString('0')).toBe('1,000,000');
    expect(calcStr.createCalcString('0')).toBe('10,000,000');
    expect(calcStr.createCalcString('.')).toBe('10,000,000.');
    expect(calcStr.createCalcString('5')).toBe('10,000,000.5');
    expect(calcStr.createCalcString('5')).toBe('10,000,000.55');
    expect(calcStr.createCalcString('5')).toBe('10,000,000.555');
    expect(calcStr.createCalcString('5')).toBe('10,000,000.5555');
    expect(calcStr.createCalcString('5')).toBe('10,000,000.55555');
  });
  it('should reset the calculor number string', () => {
    expect(calcStr.createCalcString('1')).toBe('1');
    expect(calcStr.createCalcString('0')).toBe('10');
    expect(calcStr.createCalcString('0')).toBe('100');
    calcStr.reset();
    expect(calcStr.createCalcString()).toBe('0');
    expect(calcStr.num.length).toBe(0);
    expect(calcStr.dec.length).toBe(0);
    expect(calcStr.decimal.length).toBe(0);
    expect(calcStr.hasDecimal).toBe(false);
  });
});
