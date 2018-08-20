const calcString = (function() {
  const addDecimal = () => {
    let hasDecimal = false;
    return n => {
      if (!hasDecimal) {
        hasDecimal = true;
        return n.length === 0 ? '0.' : `${n}.`;
      }
      return n;
    };
  };

  const addComma = n => {
    let str = '';
    let count = 0;
    let [num, dec] = n.split('.');

    dec = dec !== undefined ? `.${dec}` : '';

    for (let i = num.length - 1; i >= 0; i--) {
      if (count && count % 3 === 0) str = `,${str}`;
      str = num[i] + str;
      count++;
    }
    return `${str}${dec}`;
  };

  const getNum = n => (isNaN(parseFloat(n)) ? 0 : parseFloat(n));

  const calculatorString = () => {
    let num = '';
    let decimal = addDecimal();
    return n => {
      if (n === undefined) return getNum(num);
      else if (n === '.') num = decimal(num);
      else num = num + n;

      return num.length === 0 ? '0' : addComma(num);
    };
  };

  return { calculatorString };
})();
