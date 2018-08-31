const init = (function(app) {
  let { calc, calcState, calcStr, ui } = app();

  const {
    numbers,
    operators,
    clear,
    execute,
    toggleNegative,
    percent,
  } = ui.elements;

  const auxiliaryFn = fn => {
    return () => {
      let prevListener = calcState.getState('listener');
      let num =
        prevListener === 'number' ? fn(calcStr.getNumber()) : fn(calc.value());

      if (prevListener === 'number' || prevListener === 'execute') {
        calcStr.setCalcString(num);
        calcState.setState({ screen: calcStr.getCalcString() });
        if (prevListener !== 'number') {
          calcState.setState({
            activeFn: '',
            storedFn: '',
            storedNum: null,
            listener: 'number',
          });
          calc.clear();
        }
      }
    };
  };

  const plusMinusHelper = auxiliaryFn(n => n * -1);
  const percentHelper = auxiliaryFn(n => n / 100);

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

  toggleNegative.addEventListener('click', plusMinusHelper);
  percent.addEventListener('click', percentHelper);
})(appConnections);
