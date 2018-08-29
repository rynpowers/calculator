const init = (function(app) {
  let { calc, calcState, calcStr, ui } = app();

  const { numbers, operators, clear, execute, toggleNegative } = ui.elements;

  numbers.forEach(number => {
    number.addEventListener('click', e => {
      let prevListener = calcState.getState('listener');
      if (prevListener !== 'number') calcStr.reset();
      if (prevListener === 'execute') calc.clear();

      calcStr.add(e.target.value);
      let screen = calcStr.getCalcString();

      calcState.setState({ screen, listener: 'number', activeFn: '' });
    });
  });

  operators.forEach(operator => {
    operator.addEventListener('click', e => {
      let prevListener = calcState.getState('listener');
      let screen = calcState.getState('screen');
      let listener = 'operator';
      let storedFn = e.target.value;
      let activeFn = e.target.value;

      if (prevListener === '') return;
      else if (prevListener === 'number') {
        calcState.setState({ storedNum: calcStr.getNumber() });
        calcStr.setCalcString(calc.value());
        screen = calcStr.getCalcString();
      }

      calcState.setState({ listener, activeFn, storedFn, screen });
    });
  });

  clear.addEventListener('click', () => {
    ({ calc, calcState, calcStr, ui } = app());
  });

  execute.addEventListener('click', () => {
    let prevListener = calcState.getState('listener');
    let storedNum = calcState.getState('storedNum');
    let storedFn = calcState.getState('storedFn');

    if (prevListener === 'number' && storedNum && storedFn) {
      calcState.setState({ storedNum: calcStr.getNumber() });
      calcStr.setCalcString(calc.value());
      calcState.setState({
        listener: 'execute',
        screen: calcStr.getCalcString(),
      });
    }
  });

  toggleNegative.addEventListener('click', () => {
    let prevListener = calcState.getState('listener');
    let screen = calcState.getState('screen');

    if (prevListener === '') return;
    else if (prevListener === 'number') {
      calcStr.toggleNegative();
      screen = calcStr.getCalcString();
      calcState.setState({ screen });
    } else {
      calcStr.setCalcString(calc.value());
      calcStr.toggleNegative();
      calcState.setState({ screen: calcStr.getCalcString() });
      calcState.setState({
        activeFn: '',
        storedFn: '',
        storedNum: null,
        listener: 'number',
      });
      calc.clear();
    }
  });
})(appConnections);
