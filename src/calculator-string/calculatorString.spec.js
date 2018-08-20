const { calculatorString } = calcString;

describe('calculator string', () => {
  let getNum;
  beforeEach(() => {
    getNum = calculatorString();
  });

  it('should add number to the end of the string', () => {
    expect(getNum('1')).toBe('1');
    expect(getNum('2')).toBe('12');
    expect(getNum('3')).toBe('123');
    expect(getNum()).toBe(123);
  });

  it('should return type number when no argument is given', () => {
    expect(getNum()).toBe(0);
    expect(getNum('1')).toBe('1');
    expect(getNum('2')).toBe('12');
    expect(getNum()).toBe(12);
  });

  it('should add commas to the number', () => {
    expect(getNum('1')).toBe('1');
    expect(getNum('0')).toBe('10');
    expect(getNum('0')).toBe('100');
    expect(getNum('0')).toBe('1,000');
    expect(getNum('0')).toBe('10,000');
    expect(getNum('0')).toBe('100,000');
    expect(getNum('0')).toBe('1,000,000');
    expect(getNum()).toBe(1000000);
  });
  it('should add decimals', () => {
    expect(getNum('.')).toBe('0.');
    expect(getNum('1')).toBe('0.1');
    expect(getNum('2')).toBe('0.12');
    expect(getNum('3')).toBe('0.123');
    expect(getNum()).toBe(0.123);

    getNum = calculatorString();

    expect(getNum('1')).toBe('1');
    expect(getNum('2')).toBe('12');
    expect(getNum('.')).toBe('12.');
    expect(getNum('2')).toBe('12.2');
    expect(getNum('3')).toBe('12.23');
    expect(getNum()).toBe(12.23);
  });
  it('should add one decimal', () => {
    expect(getNum('.')).toBe('0.');
    expect(getNum('.')).toBe('0.');
    expect(getNum()).toBe(0);

    getNum = calculatorString();

    expect(getNum('1')).toBe('1');
    expect(getNum('2')).toBe('12');
    expect(getNum('3')).toBe('123');
    expect(getNum('.')).toBe('123.');
    expect(getNum('4')).toBe('123.4');
    expect(getNum('5')).toBe('123.45');
    expect(getNum('.')).toBe('123.45');
    expect(getNum('6')).toBe('123.456');
    expect(getNum('7')).toBe('123.4567');
    expect(getNum('8')).toBe('123.45678');
    expect(getNum('9')).toBe('123.456789');
    expect(getNum()).toBe(123.456789);
  });
  it('should add decimals and commas', () => {
    expect(getNum('1')).toBe('1');
    expect(getNum('0')).toBe('10');
    expect(getNum('0')).toBe('100');
    expect(getNum('0')).toBe('1,000');
    expect(getNum('.')).toBe('1,000.');
    expect(getNum('4')).toBe('1,000.4');
    expect(getNum('5')).toBe('1,000.45');
    expect(getNum()).toBe(1000.45);

    getNum = calculatorString();

    expect(getNum('1')).toBe('1');
    expect(getNum('0')).toBe('10');
    expect(getNum('0')).toBe('100');
    expect(getNum('0')).toBe('1,000');
    expect(getNum('0')).toBe('10,000');
    expect(getNum('0')).toBe('100,000');
    expect(getNum('0')).toBe('1,000,000');
    expect(getNum('0')).toBe('10,000,000');
    expect(getNum('.')).toBe('10,000,000.');
    expect(getNum('5')).toBe('10,000,000.5');
    expect(getNum('5')).toBe('10,000,000.55');
    expect(getNum('5')).toBe('10,000,000.555');
    expect(getNum('5')).toBe('10,000,000.5555');
    expect(getNum('5')).toBe('10,000,000.55555');
    expect(getNum()).toBe(10000000.55555);
  });
});
