const calcString = (function() {
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
    } else if (this.hasDecimal) {
      this.dec = this.dec + n;
    } else {
      this.num = this.num + n;
    }
  };

  CalcString.prototype.addCommas = function() {
    let str = '';
    let count = 0;

    for (let i = this.num.length - 1; i >= 0; i--) {
      if (count && count % 3 === 0) str = `,${str}`;
      str = this.num[i] + str;
      count++;
    }
    return this.num.length > 0 ? `${str}` : '';
  };

  CalcString.prototype.createCalcString = function(n = '') {
    this.add(n);
    let num = this.addCommas();
    let str = `${num}${this.decimal}${this.dec}`;
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
