const init = (function({ Calculator }, { CalcString }, { CalcState }, { ui }) {
  let calc = new Calculator();
  let calcStr = new CalcString();
  let calcState = new CalcState();

  const { numbers, operators, clear } = ui;

  let setScreen = ui.setScreen.bind(ui);
  let setFn = calc.setFn.bind(calc);
  let pushNum = calc.push.bind(calc);
  let setActiveFn = ui.setActiveFn.bind(ui);

  calcState.createState({
    screen: '',
    string: '',
    storedFn: '',
    activeFn: '',
    storedNum: 0,
  });

  calcState.connect({
    screen: [setScreen],
    storedFn: [setFn],
    activeFn: [setActiveFn],
    storedNum: [pushNum],
  });

  numbers.forEach(number => {
    number.addEventListener('click', e => {
      calcStr.add(e.target.value);
      calcState.setState('screen', calcStr.getCalcString());
      calcState.setState('string', calcStr.getCalcString());
      calcState.setState('activeFn', '');
      calcState.update('screen', 'storedFn', 'string', 'activeFn');
    });
  });

  operators.forEach(operator => {
    operator.addEventListener('click', e => {
      if (calcState.getState('string')) {
        calcState.setState('storedNum', calcStr.getNumber());
        calcState.update('storedNum');
      }
      calcState.setState('storedFn', e.target.value);
      calcState.setState('activeFn', e.target.value);
      calcState.update('screen', 'storedFn', 'activeFn');

      calcState.setState('string', calcStr.reset());
      calcState.setState('screen', calcStr.numToString(calc.value()));
      calcState.update('screen');
    });
  });

  clear.addEventListener('click', e => {
    console.log(e.target.value);
  });
})(calculator, calculatorString, calculatorState, UI);
