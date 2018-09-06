function addCommas(num) {
  let str = '';
  let count = 0;

  for (let i = num.length - 1; i >= 0; i--) {
    if (count && count % 3 === 0) str = `,${str}`;
    str = num[i] + str;
    count++;
  }
  return num.length > 0 ? `${str}` : '';
}

class CalcString {
  constructor(num = '', decimal = '', dec = '', negative = '') {
    this.num = num;
    this.decimal = decimal;
    this.dec = dec;
    this.negative = negative;
  }

  add(n) {
    if (n === '.') {
      this.decimal = '.';
      if (this.num === '') this.num = '0';
    } else {
      [this.dec, this.num] = this.decimal
        ? [this.dec + n, this.num]
        : [this.dec, this.num + n];
    }
  }

  setCalcString(n) {
    let [negative, num, decimal, dec] = ['', '', '', ''];
    [num, dec] = n.toString().split('.');

    if (dec) decimal = '.';
    if (num[0] === '-') [negative, num] = [num[0], num.slice(1)];

    this.num = num;
    this.decimal = decimal;
    this.dec = dec || '';
    this.negative = negative;
  }

  getCalcString() {
    let { negative, num, decimal, dec } = this;
    let str = `${negative}${addCommas(num)}${decimal}${dec}`;

    return str === '' ? '0' : str;
  }

  getNumber() {
    let { negative, num, decimal, dec } = this;
    let numString = `${negative}${num}${decimal}${dec}`;

    return numString === '' ? 0 : parseFloat(numString, 10);
  }

  reset() {
    this.num = '';
    this.dec = '';
    this.decimal = '';
    this.negative = '';
  }
}

export default CalcString;
