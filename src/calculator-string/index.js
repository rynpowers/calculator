const calculatorString = (function() {
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

  function CalcString() {
    this.num = '';
    this.decimal = '';
    this.dec = '';
    this.hasDecimal = false;
  }

  CalcString.prototype.add = function(n) {
    if (n === '.') {
      this.decimal = '.';
      if (this.num === '') this.num = '0';
      this.hasDecimal = true;
    } else {
      [this.dec, this.num] = this.hasDecimal
        ? [this.dec + n, this.num]
        : [this.dec, this.num + n];
    }
  };

  CalcString.prototype.getCalcString = function() {
    let str = `${addCommas(this.num)}${this.decimal}${this.dec}`;
    return str === '' ? '0' : str;
  };

  CalcString.prototype.reset = function() {
    this.num = '';
    this.dec = '';
    this.hasDecimal = false;
    this.decimal = '';
  };

  return { CalcString };
})();
