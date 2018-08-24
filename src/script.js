const init = (function({ Calculator }, { CalcString }, { CalcState }, { ui }) {
  let calc = new Calculator();
  let calcStr = new CalcString();
  let calcState = new CalcState();

  const { numbers, operators } = ui;

  let setScreen = ui.setScreen.bind(ui);
  let setFn = calc.setFn.bind(calc);
  let pushNum = calc.push.bind(calc);
  let setActiveFn = ui.setActiveFn.bind(ui);

  calcState.createState({
    screen: '',
    storedFn: '',
    storedNum: 0,
  });

  calcState.connect({
    screen: [setScreen],
    storedFn: [setFn, setActiveFn],
    storedNum: [pushNum],
  });

  numbers.forEach(number => {
    number.addEventListener('click', e => {
      calcStr.add(e.target.value);
      calcState.setState('screen', calcStr.getCalcString());
      calcState.update('screen');
    });
  });

  operators.forEach(operator => {
    operator.addEventListener('click', e => {
      calcState.setState('storedFn', e.target.value);
      calcState.setState('storedNum', calcStr.getNumber());
      calcState.update('storedFn', 'storedNum');
      console.log(calc);
    });
  });
})(calculator, calculatorString, calculatorState, UI);
