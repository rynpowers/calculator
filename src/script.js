const init = (function({ Calculator }, { CalcString }, { CalcState }, UI) {
  let calc = new Calculator();
  let calcStr = new CalcString();
  let calcState = new CalcState();

  console.log(calc, calcStr, calcState, UI);
})(calculator, calculatorString, calculatorState, UI);
